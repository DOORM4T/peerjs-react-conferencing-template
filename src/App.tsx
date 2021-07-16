import { Box, Heading, Input } from "@chakra-ui/react"
import React from "react"
import PeerContainer from "./components/PeerContainer"
import ConnectionsTable, {
  IConnectedPeer,
  IMyPeerData,
} from "./components/PeerContainer/ConnectionsTable"
import {
  IChangeNameAction,
  peerActionCreators,
  PeerActions,
} from "./components/PeerContainer/types"

function App() {
  return (
    <Box
      width="100vw"
      minHeight="100vh"
      bg="linear-gradient(90deg, rgba(131,58,180,1) 0%, rgba(253,29,29,1) 50%, rgba(252,176,69,1) 100%);"
      color="white"
      textAlign="center"
    >
      <Heading pt="1rem">PeerJS-React Template</Heading>
      <PeerContainer
        customPeerActionHandler={(action) => {
          switch (action.type) {
            case PeerActions.CHANGE_NAME: {
              const { name } = action as IChangeNameAction
              console.log(name)
            }
          }
        }}
        render={(myPeer, connections) => {
          if (!myPeer) return null

          const myPeerData: IMyPeerData = { peerObj: myPeer }
          const peers: IConnectedPeer[] = connections.map((connection) => ({
            connection,
          }))

          return (
            <Box width="lg" mt="1rem">
              <Input
                placeholder="Custom name"
                onChange={(e) => {
                  const value = e.currentTarget.value
                  myPeerData.name = value
                  const changeNameAction = JSON.stringify(
                    peerActionCreators.changeName(value),
                  )
                  connections.forEach((conn) => conn.send(changeNameAction))
                }}
              />
              {/* TODO: Update name when a peer changes their name */}
              <ConnectionsTable myPeerData={myPeerData} peers={peers} />
            </Box>
          )
        }}
      />
    </Box>
  )
}

export default App
