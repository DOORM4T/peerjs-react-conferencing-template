import {
  Box,
  Button,
  Flex,
  FormControl,
  FormHelperText,
  Heading,
  Input,
  Table,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react"
import { nanoid } from "nanoid"
import Peer from "peerjs"
import React, { useEffect, useRef, useState } from "react"

function App() {
  const { myPeer, connections, handleConnection, hasPeer } =
    usePeerConnections()
  const handleConnectFormSubmit = (toConnectId: string) => {
    if (hasPeer(toConnectId)) return
    connectToPeer(myPeer!, toConnectId, handleConnection)
  }

  return (
    <Box
      width="100vw"
      minHeight="100vh"
      bg="linear-gradient(90deg, rgba(131,58,180,1) 0%, rgba(253,29,29,1) 50%, rgba(252,176,69,1) 100%);"
      color="white"
      textAlign="center"
    >
      <Heading pt="1rem">PeerJS-React Template</Heading>
      {myPeer && <Text>Peer: {myPeer.id}</Text>}

      <Flex flexDirection="column" alignItems="center" justifyContent="center">
        <Box width="sm" mt="5rem">
          <PeerConnectForm handleSubmit={handleConnectFormSubmit} />
        </Box>
        {connections.length > 0 && (
          <Button
            variant="outline"
            colorScheme="telegram"
            mt="1rem"
            onClick={() => {
              connections.forEach((conn) => {
                conn.send(JSON.stringify({ message: "SPAM" }))
              })
            }}
          >
            Send Data
          </Button>
        )}
        <Box width="lg" mt="1rem">
          {myPeer && (
            <Table
              size="md"
              variant="striped"
              color="black"
              colorScheme="teal"
              bg="white"
              rounded="md"
            >
              <Thead>
                <Tr>
                  <Th>ID</Th>
                  <Th>Name</Th>
                  <Th>Data</Th>
                </Tr>
              </Thead>
              <Tbody>
                <Tr>
                  <Td>{myPeer.id}</Td>
                  <Td>My Name</Td>
                  <Td>"Doot doot"</Td>
                </Tr>
                {connections.map((conn) => (
                  <Tr key={conn.peer}>
                    <Td>{conn.peer}</Td>
                    <Td>Peer Name</Td>
                    <Td>"Beep boop"</Td>
                  </Tr>
                ))}
              </Tbody>
            </Table>
          )}
        </Box>
      </Flex>
    </Box>
  )
}

interface IConnectFormProps {
  handleSubmit: (toConnectId: string) => void
}
const PeerConnectForm = ({ handleSubmit }: IConnectFormProps) => {
  const _handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const toConnectId = (e.target as HTMLFormElement)["peer-id"].value as string
    handleSubmit(toConnectId)
  }

  return (
    <form action="" onSubmit={_handleSubmit}>
      <FormControl id="peer-id">
        <Input type="text" />
        <FormHelperText color="white">
          Enter a peer's ID and connect!
        </FormHelperText>
        <Button type="submit" colorScheme="telegram" mt="1rem">
          Connect
        </Button>
      </FormControl>
    </form>
  )
}

const usePeerConnections = () => {
  const [myPeer, setMyPeer] = useState<Peer | null>(null)
  const latestMyPeer = useRef<typeof myPeer>(null)
  useEffect(() => {
    // Track latest myPeer state in a ref so we can access it in listeners or other functions that rely on it
    latestMyPeer.current = myPeer
  }, [myPeer])

  useEffect(() => {
    // Initialize myPeer
    if (myPeer) myPeer.destroy()
    const peer = new Peer(nanoid(10))
    listenForConnections(peer, handleConnection)
    setMyPeer(peer)
  }, [])

  const [connections, setConnections] = useState<Peer.DataConnection[]>([])
  const latestConnections = useRef<typeof connections>([])
  useEffect(() => {
    // Track latest connections state in a ref so we can access it in listeners or other functions that rely on it
    latestConnections.current = connections
  }, [connections])

  const addConnection = (conn: Peer.DataConnection) => {
    setConnections(latestConnections.current.concat(conn))
  }

  const removeConnection = (conn: Peer.DataConnection) => {
    setConnections(
      latestConnections.current.filter((c) => c.peer !== conn.peer),
    )
  }

  const hasPeer = (peer: string) => {
    const isMyPeer = peer === latestMyPeer.current?.id
    const hasPeer = latestConnections.current.some((c) => c.peer === peer)
    return isMyPeer || hasPeer
  }

  const handleConnectionOpen = (conn: Peer.DataConnection) => {
    if (hasPeer(conn.peer)) return
    addConnection(conn)
    console.log(`Connected with ${conn.peer}`)

    conn.send(
      JSON.stringify(
        sharePeersAction(latestConnections.current.map((c) => c.peer)),
      ),
    )
    console.log(`Sharing peers with ${conn.peer}`)
  }

  const handleConnectionData = (conn: Peer.DataConnection, data: string) => {
    console.log(`[${conn.peer}]: ${data}`)

    const action = JSON.parse(data) as ConnectionAction
    switch (action.type) {
      case PeerActions.SHARE_PEERS: {
        action.peers.forEach((peer) => {
          if (hasPeer(peer) || !latestMyPeer.current) return
          console.log(`Connecting with shared peer ${peer}`)
          connectToPeer(latestMyPeer.current, peer, handleConnection)
        })
      }
    }
  }

  const handleConnectionClose = (conn: Peer.DataConnection) => {
    removeConnection(conn)
    console.log(`Disconnected from ${conn.peer}`)
  }

  const handleConnection: HandleConnectionCallback = (conn) => {
    conn.on("open", () => handleConnectionOpen(conn))
    conn.on("data", (data) => handleConnectionData(conn, data))
    conn.on("close", () => handleConnectionClose(conn))
    conn.on("error", console.error)
  }

  return { myPeer, connections, handleConnection, hasPeer }
}

const listenForConnections = (
  callee: Peer,
  handleConnection: HandleConnectionCallback,
) => callee.on("connection", handleConnection)

const connectToPeer = (
  caller: Peer,
  toConnectId: string,
  handleConnection: HandleConnectionCallback,
) => {
  const conn = caller.connect(toConnectId)
  handleConnection(conn)
}

type HandleConnectionCallback = (conn: Peer.DataConnection) => void

enum PeerActions {
  SHARE_PEERS = "SHARE_PEERS",
}

type ConnectionAction = ISharePeersAction
interface ISharePeersAction {
  type: PeerActions.SHARE_PEERS
  peers: string[]
}
const sharePeersAction = (peers: string[]): ISharePeersAction => {
  return { type: PeerActions.SHARE_PEERS, peers }
}

export default App
