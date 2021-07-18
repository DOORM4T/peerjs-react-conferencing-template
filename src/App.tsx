import { Box, Button, Heading, HStack, Input, useToast } from "@chakra-ui/react"
import React from "react"
import PeerContainer from "./components/PeerContainer"
import {
  changeName,
  handlePeerNameChange,
} from "./components/PeerContainer/actions/changeName"
import {
  handlePeerDiceRoll,
  rollDice,
} from "./components/PeerContainer/actions/rollDice"
import DiceRollTable from "./components/PeerContainer/DiceRollTable"
import {
  CustomConnectionHandler,
  CustomPeerActionHandler,
  IPeerState,
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

    const handleDiceRoll = () => {
      const roll = Math.floor(Math.random() * (20 - 1)) + 1

      setMyPeer((latest) => ({ ...latest!, latestRoll: roll }))

      const action = JSON.stringify(rollDice(myPeer.peerObj.id, roll))
      peers.forEach((p) => p.connection.send(action))
    }

    const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = e.currentTarget.value

      setMyPeer((latest) => ({ ...latest!, name: value }))

      const changeNameAction = JSON.stringify(
        changeName(myPeer.peerObj.id, value),
      )
      peers.forEach((p) => p.connection.send(changeNameAction))
    }

    return (
      <Box width="lg" mt="3rem">
        <hr />
        <Heading size="lg" mt="1rem">
          Demo: Dice Roller
        </Heading>
        <HStack mt="1rem">
          <Input placeholder="Custom name" onChange={handleNameChange} />
          <Button colorScheme="yellow" onClick={handleDiceRoll}>
            Roll
          </Button>
        </HStack>
        <Box mt="1rem">
          <DiceRollTable myPeer={myPeer} peers={peers} />
        </Box>
      </Box>
    )
  }

  const onPeerAction: CustomPeerActionHandler = (action, state) => {
    switch (action.type) {
      case PeerActions.CHANGE_NAME:
        handlePeerNameChange(action, state)
        return

      case PeerActions.ROLL:
        handlePeerDiceRoll(action, state)
        return
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
