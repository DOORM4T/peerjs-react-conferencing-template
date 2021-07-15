import {
  Box,
  Button,
  Center,
  FormControl,
  FormHelperText,
  Heading,
  Input,
  Text,
} from "@chakra-ui/react"
import { nanoid } from "nanoid"
import Peer from "peerjs"
import React, { useEffect, useState } from "react"

function App() {
  const { myPeer, connections, handleCalleeConnection } = usePeerConnections()

  return (
    <Box
      width="100vw"
      height="100vh"
      bg="linear-gradient(90deg, rgba(131,58,180,1) 0%, rgba(253,29,29,1) 50%, rgba(252,176,69,1) 100%);"
      color="white"
      textAlign="center"
    >
      <Heading pt="1rem">PeerJS-React Template</Heading>
      {myPeer && <Text>Peer: {myPeer.id}</Text>}

      <Center>
        <Box width="sm" mt="5rem">
          <PeerConnectForm
            myPeer={myPeer}
            handleConnection={handleCalleeConnection}
          />
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
        </Box>
      </Center>
    </Box>
  )
}

interface IConnectFormProps {
  myPeer: Peer | null
  handleConnection: HandleConnectionCallback
}
const PeerConnectForm = ({ myPeer, handleConnection }: IConnectFormProps) => {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const toConnectId = (e.target as HTMLFormElement)["peer-id"].value as string
    const isMyPeer = toConnectId === myPeer?.id
    const doStop = !myPeer || !toConnectId || isMyPeer
    if (doStop) return
    connectToPeer(myPeer!, toConnectId, handleConnection)
  }

  return (
    <form action="" onSubmit={handleSubmit}>
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
  useEffect(() => {
    const peer = new Peer(nanoid(10))
    listenForConnections(peer, _handleCallerConnection)
    setMyPeer(peer)

    return myPeer?.destroy
  }, [])

  const [connections, setConnections] = useState<Peer.DataConnection[]>([])
  const addConnection = (conn: Peer.DataConnection) =>
    setConnections(connections.concat(conn))

  // A caller connected to this this callee
  const _handleCallerConnection: HandleConnectionCallback = (conn) => {
    conn.on("open", () => {
      addConnection(conn)
      console.log(`Connected with ${conn.peer}`)
    })
    conn.on("data", (data) => {
      console.log(`[${conn.peer}]: ${data}`)
    })
    conn.on("error", console.error)
  }

  // A callee connected to this caller
  const handleCalleeConnection: HandleConnectionCallback = (conn) => {
    conn.on("open", () => {
      addConnection(conn)
      console.log(`Connected with ${conn.peer}`)
    })
    conn.on("data", (data) => {
      console.log(`[${conn.peer}]: ${data}`)
    })
    conn.on("error", console.error)
  }

  return { myPeer, connections, handleCalleeConnection }
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
export default App
