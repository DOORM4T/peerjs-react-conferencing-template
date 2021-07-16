import { useToast } from "@chakra-ui/react"
import { nanoid } from "nanoid"
import Peer from "peerjs"
import { useEffect, useRef, useState } from "react"
import {
  CustomPeerActionHandler,
  IConnectionAction,
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

  const [myPeer, setMyPeer] = useState<Peer | null>(null)
  const latestMyPeer = useRef<typeof myPeer>(null)
  useEffect(() => {
    // Track latest myPeer state in a ref so we can access it in listeners or other functions that rely on it
    latestMyPeer.current = myPeer
  }, [myPeer])

  const initMyPeer = () => {
    if (latestMyPeer.current) latestMyPeer.current.destroy()
    const peer = new Peer(nanoid(10))
    listenForConnections(peer)
    setMyPeer(peer)
  }

  useEffect(initMyPeer, [])

  const [connections, setConnections] = useState<Peer.DataConnection[]>([])
  const latestConnections = useRef<typeof connections>([])
  useEffect(() => {
    // Track latest connections state in a ref so we can access it in listeners or other functions that rely on it
    latestConnections.current = connections
  }, [connections])

  const addConnection = (conn: Peer.DataConnection) => {
    toast({ title: "Peer Connected", description: conn.peer, status: "info" })
    setConnections(latestConnections.current.concat(conn))
  }

  const removeConnection = (conn: Peer.DataConnection) => {
    toast({
      title: "Peer Disconnected",
      description: conn.peer,
      status: "error",
    })
    setConnections(
      latestConnections.current.filter((c) => c.peer !== conn.peer),
    )
  }

  const hasPeer = (peer: string) => {
    const isMyPeer = peer === latestMyPeer.current?.id
    const hasPeer = latestConnections.current.some((c) => c.peer === peer)
    return isMyPeer || hasPeer
  }
  const disconnect = () => {
    const toDisconnect = latestConnections.current
    toDisconnect.forEach((conn) => conn.close())
    setConnections([])
  }

  const listenForConnections = (callee: Peer) =>
    callee.on("connection", handleConnection)

  const connectToPeer = (toConnectId: string) => {
    if (!latestMyPeer.current) return
    const conn = latestMyPeer.current.connect(toConnectId)
    handleConnection(conn)
  }

  const handleConnectionOpen = (conn: Peer.DataConnection) => {
    if (hasPeer(conn.peer)) return
    addConnection(conn)
    console.log(`Connected with ${conn.peer}`)

    conn.send(
      JSON.stringify(
        peerActionCreators.sharePeers(
          latestConnections.current.map((c) => c.peer),
        ),
      ),
    )
    console.log(`Shared peers with ${conn.peer}`)
  }

  const handleConnectionData = (conn: Peer.DataConnection, data: string) => {
    console.log(`[${conn.peer}]: ${data}`)

    const action = JSON.parse(data) as IConnectionAction
    if (action.type === PeerActions.SHARE_PEERS) {
      const { peers } = action as ISharePeersAction
      peers.forEach((peer) => {
        if (hasPeer(peer) || !latestMyPeer.current) return
        console.log(`Connecting with shared peer ${peer}`)
        connectToPeer(peer)
      })
      return
    }

    // Handle custom actions
    props.customPeerActionHandler && props.customPeerActionHandler(action)
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
    myPeer,
    connections,
    connectToPeer,
    disconnect,
    hasPeer,
    initMyPeer,
  }
}

export default usePeerConnections
