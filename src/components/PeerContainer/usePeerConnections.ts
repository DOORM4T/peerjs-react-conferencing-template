import { useToast } from "@chakra-ui/react"
import { nanoid } from "nanoid"
import Peer from "peerjs"
import { useEffect, useRef, useState } from "react"
import {
  CustomPeerActionHandler,
  IConnectionAction,
  IMyPeer,
  IPeerConnection,
  IPeerData,
  IShareMyPeerDataAction,
  ISharePeersAction,
  peerActionCreators,
  PeerActions,
} from "./types"

interface IProps {
  customPeerActionHandler?: CustomPeerActionHandler
}
const usePeerConnections = (props: IProps) => {
  const toast = useToast({
    duration: 9000,
    isClosable: true,
    position: "top-right",
  })

  const [myPeer, setMyPeer] = useState<(IMyPeer & IPeerData) | null>(null)
  const latestMyPeer = useRef<typeof myPeer>(null)
  useEffect(() => {
    // Track latest myPeer state in a ref so we can access it in listeners or other functions that rely on it
    latestMyPeer.current = myPeer
  }, [myPeer])

  const initMyPeer = () => {
    if (latestMyPeer.current?.peerObj) latestMyPeer.current.peerObj.destroy()
    const peerObj = new Peer(nanoid(10))
    listenForConnections(peerObj)

    // A peer's name will be their ID by default
    setMyPeer({ peerObj, name: peerObj.id })
  }

  useEffect(initMyPeer, [])

  const [peers, setPeers] = useState<(IPeerConnection & IPeerData)[]>([])
  const latestConnections = useRef<typeof peers>([])
  useEffect(() => {
    // Track latest connections state in a ref so we can access it in listeners or other functions that rely on it
    latestConnections.current = peers
  }, [peers])

  const addConnection = (conn: Peer.DataConnection) => {
    toast({ title: "Peer Connected", description: conn.peer, status: "info" })
    const updatedConnections = latestConnections.current.concat({
      connection: conn,
      name: conn.peer,
    })
    setPeers(updatedConnections)
  }

  const removeConnection = (conn: Peer.DataConnection) => {
    toast({
      title: "Peer Disconnected",
      description: conn.peer,
      status: "error",
    })
    setPeers(
      latestConnections.current.filter((c) => c.connection.peer !== conn.peer),
    )
  }

  const hasPeer = (peer: string) => {
    const isMyPeer = peer === latestMyPeer.current?.peerObj.id
    const hasPeer = latestConnections.current.some(
      (c) => c.connection.peer === peer,
    )
    return isMyPeer || hasPeer
  }
  const disconnect = () => {
    const toDisconnect = latestConnections.current
    toDisconnect.forEach((conn) => conn.connection.close())
    setPeers([])
  }

  const listenForConnections = (callee: Peer) =>
    callee.on("connection", handleConnection)

  const connectToPeer = (toConnectId: string) => {
    if (!latestMyPeer.current) return
    const conn = latestMyPeer.current.peerObj.connect(toConnectId)
    handleConnection(conn)
  }

  const handleConnectionOpen = (conn: Peer.DataConnection) => {
    if (hasPeer(conn.peer)) return
    addConnection(conn)
    console.log(`Connected with ${conn.peer}`)

    const myId = latestMyPeer.current?.peerObj.id
    if (!myId) return

    const sharePeersAction = JSON.stringify(
      peerActionCreators.sharePeers(
        myId,
        latestConnections.current.map((c) => c.connection.peer),
      ),
    )
    conn.send(sharePeersAction)

    const myPeerData = { ...latestMyPeer.current }
    delete myPeerData?.peerObj
    const shareMyPeerDataAction = JSON.stringify(
      peerActionCreators.shareMyPeerData(myId, myPeerData),
    )
    conn.send(shareMyPeerDataAction)
    console.log(`Shared peers with ${conn.peer}`)
  }

  const handleConnectionData = (conn: Peer.DataConnection, data: string) => {
    console.log(`[${conn.peer}]: ${data}`)

    const action = JSON.parse(data) as IConnectionAction
    switch (action.type) {
      case PeerActions.SHARE_PEERS: {
        const { peers } = action as ISharePeersAction
        peers.forEach((peer) => {
          if (hasPeer(peer) || !latestMyPeer.current) return
          console.log(`Connecting with shared peer ${peer}`)
          connectToPeer(peer)
        })
        return
      }

      case PeerActions.SHARE_MY_PEER_DATA: {
        const { senderId, data } = action as IShareMyPeerDataAction
        console.log(data)
        setPeers((latest) => {
          const toUpdateIndex = latest.findIndex(
            (p) => p.connection.peer === senderId,
          )
          if (toUpdateIndex === -1) return latest
          const updatedPeer: IPeerData & IPeerConnection = {
            ...latest[toUpdateIndex],
            ...data,
          }
          const updatedPeers = [...latest]
          updatedPeers[toUpdateIndex] = updatedPeer
          return updatedPeers
        })

        return
      }
    }

    // Handle custom actions
    props.customPeerActionHandler &&
      props.customPeerActionHandler(action, {
        myPeer,
        setMyPeer,
        peers,
        setPeers,
      })
  }

  const handleConnectionClose = (conn: Peer.DataConnection) => {
    removeConnection(conn)
    console.log(`Disconnected from ${conn.peer}`)
  }

  const handleConnection = (conn: Peer.DataConnection) => {
    conn.on("open", () => handleConnectionOpen(conn))
    conn.on("data", (data) => handleConnectionData(conn, data))
    conn.on("close", () => handleConnectionClose(conn))
    conn.on("error", console.error)
  }

  return {
    state: {
      myPeer,
      setMyPeer,

      peers,
      setPeers,
    },
    connectToPeer,
    disconnect,
    hasPeer,
    initMyPeer,
  }
}

export default usePeerConnections
