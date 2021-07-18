import {nanoid} from "../../../_snowpack/pkg/nanoid.js";
import Peer from "../../../_snowpack/pkg/peerjs.js";
import {useEffect, useRef, useState} from "../../../_snowpack/pkg/react.js";
import {
  peerActionCreators,
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
    const sharePeersAction = JSON.stringify(peerActionCreators.sharePeers(myId, latestPeers.current.map((c) => c.connection.peer)));
    conn.send(sharePeersAction);
    const myPeerData = {...latestMyPeer.current};
    delete myPeerData?.peerObj;
    const shareMyPeerDataAction = JSON.stringify(peerActionCreators.shareMyPeerData(myId, myPeerData));
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
        setPeers((latest) => {
          const toUpdateIndex = latest.findIndex((p) => p.connection.peer === senderId);
          if (toUpdateIndex === -1)
            return latest;
          const updatedPeer = {
            ...latest[toUpdateIndex],
            ...data2
          };
          const updatedPeers = [...latest];
          updatedPeers[toUpdateIndex] = updatedPeer;
          return updatedPeers;
        });
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
