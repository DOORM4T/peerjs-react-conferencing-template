import { Box, Heading, Input } from "@chakra-ui/react"
import React from "react"
import PeerContainer from "./components/PeerContainer"
import ConnectionsTable from "./components/PeerContainer/ConnectionsTable"
import {
  IChangeNameAction,
  IPeerConnection,
  IPeerData,
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
        customPeerActionHandler={(action, state) => {
          switch (action.type) {
            case PeerActions.CHANGE_NAME: {
              const { senderId, name } = action as IChangeNameAction
              console.log(name)

              state.setPeers((latest) => {
                const changedPeerIndex = latest.findIndex(
                  (peer) => peer.connection.peer === senderId,
                )
                if (changedPeerIndex === -1) return latest
                const updatedPeer: IPeerConnection & IPeerData = {
                  ...latest[changedPeerIndex],
                  name,
                }
                const updatedPeers = [...latest]
                updatedPeers[changedPeerIndex] = updatedPeer
                return updatedPeers
              })
            }
          }
        }}
        render={({ myPeer, peers, setMyPeer, setPeers }) => {
          if (!myPeer || !myPeer.peerObj || !myPeer.peerObj.id) return null

          return (
            <Box width="lg" mt="1rem">
              <Input
                placeholder="Custom name"
                onChange={(e) => {
                  const value = e.currentTarget.value

                  setMyPeer((latest) => ({ ...latest!, name: value }))

                  const changeNameAction = JSON.stringify(
                    peerActionCreators.changeName(myPeer.peerObj.id, value),
                  )
                  peers.forEach((p) => p.connection.send(changeNameAction))
                }}
              />
              {/* TODO: Update name when a peer changes their name */}
              <ConnectionsTable myPeer={myPeer} peers={peers} />
            </Box>
          )
        }}
      />
    </Box>
  )
}

export default App
