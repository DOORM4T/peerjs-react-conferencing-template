import produce from "../../../snowpack/pkg/immer.js";
import {nanoid} from "../../../snowpack/pkg/nanoid.js";
import Peer from "../../../snowpack/pkg/peerjs.js";
import {useEffect, useRef, useState} from "../../../snowpack/pkg/react.js";
import {
  shareMyPeerData
} from "./actions/shareMyPeerData.js";
import {sharePeers} from "./actions/sharePeers.js";
import {
  PeerActions
} from "./types.js";
const usePeerConnections = (props) => {
  const [myPeer, setMyPeer] = useState(null);
  const latestMyPeer = useRef(null);
  useEffect(() => {
    latestMyPeer.current = myPeer;
  }, [myPeer]);
  const initMyPeer = () => {
    if (latestMyPeer.current?.peerObj)
      latestMyPeer.current.peerObj.destroy();
    const peerObj = new Peer(nanoid(props.idLength || 10));
    listenForConnections(peerObj);
    setMyPeer({peerObj});
  };
  useEffect(initMyPeer, []);
  const [peers, setPeers] = useState([]);
  const latestPeers = useRef([]);
  useEffect(() => {
    latestPeers.current = peers;
  }, [peers]);
  const addConnection = (conn) => {
    const updatedConnections = latestPeers.current.concat({
      connection: conn
    });
    setPeers(updatedConnections);
  };
  const removeConnection = (conn) => {
    setPeers(latestPeers.current.filter((c) => c.connection.peer !== conn.peer));
  };
  const hasPeer = (peer) => {
    const isMyPeer = peer === latestMyPeer.current?.peerObj.id;
    const hasPeer2 = latestPeers.current.some((c) => c.connection.peer === peer);
    return isMyPeer || hasPeer2;
  };
  const disconnect = () => {
    const toDisconnect = latestPeers.current;
    toDisconnect.forEach((conn) => conn.connection.close());
    setPeers([]);
  };
  const getState = () => {
    return {
      myPeer: latestMyPeer.current,
      setMyPeer,
      peers: latestPeers.current,
      setPeers
    };
  };
  const listenForConnections = (callee) => callee.on("connection", handleConnection);
  const connectToPeer = (toConnectId) => {
    if (!latestMyPeer.current)
      return;
    const conn = latestMyPeer.current.peerObj.connect(toConnectId);
    handleConnection(conn);
  };
  const handleConnectionOpen = (conn) => {
    const myId = latestMyPeer.current?.peerObj.id;
    if (!myId)
      return;
    if (hasPeer(conn.peer))
      return;
    addConnection(conn);
    console.log(`Connected with ${conn.peer}`);
    const sharePeersAction = JSON.stringify(sharePeers(myId, latestPeers.current.map((c) => c.connection.peer)));
    conn.send(sharePeersAction);
    const {peerObj: _, ...myPeerData} = {...latestMyPeer.current};
    const shareMyPeerDataAction = JSON.stringify(shareMyPeerData(myId, myPeerData));
    conn.send(shareMyPeerDataAction);
    console.log(`Shared peers with ${conn.peer}`);
  };
  const handleConnectionData = (conn, data) => {
    console.log(`[${conn.peer}]: ${data}`);
    const action = JSON.parse(data);
    switch (action.type) {
      case PeerActions.SHARE_PEERS: {
        const {peers: peers2} = action;
        peers2.forEach((peer) => {
          if (hasPeer(peer) || !latestMyPeer.current)
            return;
          console.log(`Connecting with shared peer ${peer}`);
          connectToPeer(peer);
        });
        return;
      }
      case PeerActions.SHARE_MY_PEER_DATA: {
        const {senderId, data: data2} = action;
        const latestState = {...getState()};
        const latestPeerIndex = latestState.peers.findIndex((p) => p.connection.peer === senderId);
        if (latestPeerIndex !== -1) {
          latestState.peers[latestPeerIndex].name = data2.name;
          props.onConnectionOpen && props.onConnectionOpen(conn, latestState);
        }
        setPeers((latest) => produce(latest, (draft) => {
          const peerIndex = draft.findIndex((p) => p.connection.peer === senderId);
          if (peerIndex === -1)
            return;
          draft[peerIndex] = {...draft[peerIndex], ...data2};
        }));
        return;
      }
    }
    props.onPeerAction && props.onPeerAction(action, getState());
  };
  const handleConnectionClose = (conn) => {
    props.onConnectionClose && props.onConnectionClose(conn, getState());
    removeConnection(conn);
    console.log(`Disconnected from ${conn.peer}`);
  };
  const handleConnection = (conn) => {
    conn.on("open", () => handleConnectionOpen(conn));
    conn.on("data", (data) => handleConnectionData(conn, data));
    conn.on("close", () => handleConnectionClose(conn));
    conn.on("error", console.error);
  };
  return {
    state: {
      myPeer,
      setMyPeer,
      peers,
      setPeers
    },
    connectToPeer,
    disconnect,
    hasPeer,
    initMyPeer
  };
};
export default usePeerConnections;
