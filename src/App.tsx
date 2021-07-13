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
import Peer from "peerjs"
import React, { useEffect, useState } from "react"
import { v4 as uuidv4 } from "uuid"

function App() {
  const [myPeer, setMyPeer] = useState<Peer | null>(null)
  const [peers, setPeers] = useState<Peer[]>([])

  useEffect(() => {
    const peer = new Peer(uuidv4())
    setMyPeer(peer)
  }, [])

  useEffect(() => {
    if (!myPeer) return

    myPeer.on("connection", (conn) => {
      conn.on("data", (data) => {
        console.log(data)
      })
    })

    return myPeer?.destroy
  }, [myPeer])

  return (
    <Box
      width="100vw"
      height="100vh"
      bg="linear-gradient(90deg, rgba(131,58,180,1) 0%, rgba(253,29,29,1) 50%, rgba(252,176,69,1) 100%);"
      color="white"
      textAlign="center"
    >
      <Heading pt="1rem">Hello world!</Heading>
      {myPeer && <Text>Peer: {myPeer.id}</Text>}

      <Center>
        <Box width="sm" mt="5rem">
          <form
            action=""
            onSubmit={(e) => {
              e.preventDefault()
              const toConnectId = (e.target as any)["peer-id"].value as string
              if (!myPeer || !toConnectId) return
              const conn = myPeer.connect(toConnectId)

              conn.on("open", () => {
                conn.send("Hello there!")
              })
            }}
          >
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
        </Box>
      </Center>
    </Box>
  )
}

export default App
