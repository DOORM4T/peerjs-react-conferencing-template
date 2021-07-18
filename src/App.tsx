import { Box, Button, Heading, HStack, Input, useToast } from "@chakra-ui/react"
import React from "react"
import PeerContainer from "./components/PeerContainer"
import DiceRollTable from "./components/PeerContainer/DiceRollTable"
import {
  CustomConnectionHandler,
  CustomPeerActionHandler,
  IChangeNameAction,
  IPeerConnection,
  IPeerData,
  IPeerState,
  IRollAction,
  peerActionCreators,
  PeerActions,
} from "./components/PeerContainer/types"

const App = () => {
  const { render, onConnectionOpen, onConnectionClose, onPeerAction } =
    usePeerDiceRoller()

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
        render={render}
        onPeerAction={onPeerAction}
        onConnectionOpen={onConnectionOpen}
        onConnectionClose={onConnectionClose}
      />
    </Box>
  )
}

const usePeerDiceRoller = () => {
  const toast = useToast({
    duration: 9000,
    isClosable: true,
    position: "top-right",
  })

  const render = ({ myPeer, peers, setMyPeer, setPeers }: IPeerState) => {
    if (!myPeer || !myPeer.peerObj || !myPeer.peerObj.id) return null

    return (
      <Box width="lg" mt="3rem">
        <hr />
        <Heading size="lg" mt="1rem">
          Demo: Dice Roller
        </Heading>
        <HStack mt="1rem">
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
          <Button
            colorScheme="yellow"
            onClick={() => {
              const roll = Math.floor(Math.random() * (20 - 1)) + 1

              setMyPeer((latest) => ({ ...latest!, latestRoll: roll }))

              const action = JSON.stringify(
                peerActionCreators.roll(myPeer.peerObj.id, roll),
              )
              peers.forEach((p) => p.connection.send(action))
            }}
          >
            Roll
          </Button>
        </HStack>
        {/* TODO: Update name when a peer changes their name */}
        <Box mt="1rem">
          <DiceRollTable myPeer={myPeer} peers={peers} />
        </Box>
      </Box>
    )
  }

  const onPeerAction: CustomPeerActionHandler = (action, state) => {
    switch (action.type) {
      case PeerActions.CHANGE_NAME: {
        const { senderId, name } = action as IChangeNameAction

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

      case PeerActions.ROLL: {
        const { senderId, roll } = action as IRollAction

        state.setPeers((latest) => {
          const changedPeerIndex = latest.findIndex(
            (peer) => peer.connection.peer === senderId,
          )
          if (changedPeerIndex === -1) return latest
          const updatedPeer: IPeerConnection & IPeerData = {
            ...latest[changedPeerIndex],
            latestRoll: roll,
          }
          const updatedPeers = [...latest]
          updatedPeers[changedPeerIndex] = updatedPeer
          return updatedPeers
        })
      }
    }
  }

  const onConnectionOpen: CustomConnectionHandler = (conn, state) => {
    const newPeer = state.peers.find((p) => p.connection.peer === conn.peer)
    const description = `${newPeer?.name ? `${newPeer.name} ` : ""}${conn.peer}`
    toast({ title: "Peer Connected", description, status: "info" })
  }

  const onConnectionClose: CustomConnectionHandler = (conn, state) => {
    const closedPeer = state.peers.find((p) => p.connection.peer === conn.peer)
    const description = `${closedPeer?.name ? `${closedPeer.name} ` : ""}${
      conn.peer
    }`
    toast({ title: "Peer Disconnected", description, status: "error" })
  }

  return { render, onPeerAction, onConnectionOpen, onConnectionClose }
}

export default App
