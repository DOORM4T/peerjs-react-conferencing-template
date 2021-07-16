import {
  Box,
  Button,
  Flex,
  FormControl,
  Heading,
  HStack,
  Input,
  Table,
  Tbody,
  Td,
  Th,
  Thead,
  Tooltip,
  Tr,
  useToast,
} from "@chakra-ui/react"
import { nanoid } from "nanoid"
import Peer from "peerjs"
import React, { useEffect, useRef, useState } from "react"

function App() {
  const {
    connections,
    connectToPeer,
    disconnect,
    hasPeer,
    initMyPeer,
    myPeer,
  } = usePeerConnections()
  const handleConnectFormSubmit = (toConnectId: string) => {
    if (hasPeer(toConnectId)) return
    connectToPeer(toConnectId)
  }
  const hasPeers = connections.length > 0

  if (myPeer && !myPeer.id) {
    window.location.reload()
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
      <HStack
        flexDirection="row"
        alignItems="center"
        justifyContent="center"
        mt="1rem"
      >
        {myPeer && myPeer.id && <CopyMyIDInput myId={myPeer.id} />}
        {!hasPeers && (
          <Button colorScheme="yellow" onClick={initMyPeer}>
            New ID
          </Button>
        )}
      </HStack>

      <Flex
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        mt="1rem"
      >
        <PeerConnectForm
          handleSubmit={handleConnectFormSubmit}
          doShowDisconnect={hasPeers}
          disconnect={disconnect}
        />
        <Box width="lg" mt="1rem">
          {myPeer && (
            <ConnectionsTable myPeerId={myPeer.id} connections={connections} />
          )}
        </Box>
      </Flex>
    </Box>
  )
}

const ConnectionsTable = (props: {
  myPeerId: string
  connections: Peer.DataConnection[]
}) => {
  const { connections, myPeerId } = props

  return (
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
          <Td>{myPeerId}</Td>
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
  )
}

const CopyMyIDInput = (props: { myId: string }) => {
  const { myId } = props
  const toast = useToast()

  const handleCopy = (e: React.MouseEvent<HTMLInputElement, MouseEvent>) => {
    e.currentTarget.select()
    document.execCommand("copy")
    toast({
      title: "Copied ID to clipboard!",
      status: "success",
      duration: 1000,
      isClosable: true,
      position: "top-right",
    })
  }

  return (
    <Tooltip label="Click to copy!" placement="right">
      <Input
        ml="1rem"
        value={myId}
        width="auto"
        onClick={handleCopy}
        readOnly
      />
    </Tooltip>
  )
}

interface IConnectFormProps {
  handleSubmit: (toConnectId: string) => void
  doShowDisconnect: boolean
  disconnect: () => void
}
const PeerConnectForm = ({
  handleSubmit,
  doShowDisconnect,
  disconnect,
}: IConnectFormProps) => {
  const _handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const toConnectId = (e.target as HTMLFormElement)["peer-id"].value as string
    handleSubmit(toConnectId)
  }

  return (
    <form action="" onSubmit={_handleSubmit}>
      <FormControl id="peer-id">
        <HStack alignItems="center" justifyContent="center">
          <Input
            type="text"
            onClick={(e) => {
              e.currentTarget.select()
            }}
          />
          <Button type="submit" colorScheme="telegram">
            Connect
          </Button>

          {doShowDisconnect && (
            <Button colorScheme="red" onClick={disconnect}>
              Disconnect
            </Button>
          )}
        </HStack>
      </FormControl>
    </form>
  )
}

const usePeerConnections = () => {
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
          connectToPeer(peer)
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

  return {
    myPeer,
    connections,
    connectToPeer,
    disconnect,
    hasPeer,
    initMyPeer,
  }
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
