import {Box, Button, Heading, HStack, Input, useToast} from "../_snowpack/pkg/@chakra-ui/react.js";
import React from "../_snowpack/pkg/react.js";
import PeerContainer from "./components/PeerContainer/index.js";
import {
  changeName,
  handlePeerNameChange
} from "./components/PeerContainer/actions/changeName.js";
import {
  handlePeerDiceRoll,
  rollDice
} from "./components/PeerContainer/actions/rollDice.js";
import DiceRollTable from "./components/PeerContainer/DiceRollTable.js";
import {
  PeerActions
} from "./components/PeerContainer/types.js";
const App = () => {
  const {render, onConnectionOpen, onConnectionClose, onPeerAction} = usePeerDiceRoller();
  return /* @__PURE__ */ React.createElement(Box, {
    width: "100vw",
    minHeight: "100vh",
    bg: "linear-gradient(90deg, rgba(131,58,180,1) 0%, rgba(253,29,29,1) 50%, rgba(252,176,69,1) 100%);",
    color: "white",
    textAlign: "center"
  }, /* @__PURE__ */ React.createElement(Heading, {
    pt: "1rem"
  }, "PeerJS-React Template"), /* @__PURE__ */ React.createElement(PeerContainer, {
    render,
    onPeerAction,
    onConnectionOpen,
    onConnectionClose
  }));
};
const usePeerDiceRoller = () => {
  const toast = useToast({
    duration: 9e3,
    isClosable: true,
    position: "top-right"
  });
  const render = ({myPeer, peers, setMyPeer, setPeers}) => {
    if (!myPeer || !myPeer.peerObj || !myPeer.peerObj.id)
      return null;
    const handleDiceRoll = () => {
      const roll = Math.floor(Math.random() * (20 - 1)) + 1;
      setMyPeer((latest) => ({...latest, latestRoll: roll}));
      const action = JSON.stringify(rollDice(myPeer.peerObj.id, roll));
      peers.forEach((p) => p.connection.send(action));
    };
    const handleNameChange = (e) => {
      const value = e.currentTarget.value;
      setMyPeer((latest) => ({...latest, name: value}));
      const changeNameAction = JSON.stringify(changeName(myPeer.peerObj.id, value));
      peers.forEach((p) => p.connection.send(changeNameAction));
    };
    return /* @__PURE__ */ React.createElement(Box, {
      width: "lg",
      mt: "3rem"
    }, /* @__PURE__ */ React.createElement("hr", null), /* @__PURE__ */ React.createElement(Heading, {
      size: "lg",
      mt: "1rem"
    }, "Demo: Dice Roller"), /* @__PURE__ */ React.createElement(HStack, {
      mt: "1rem"
    }, /* @__PURE__ */ React.createElement(Input, {
      placeholder: "Custom name",
      onChange: handleNameChange
    }), /* @__PURE__ */ React.createElement(Button, {
      colorScheme: "yellow",
      onClick: handleDiceRoll
    }, "Roll")), /* @__PURE__ */ React.createElement(Box, {
      mt: "1rem"
    }, /* @__PURE__ */ React.createElement(DiceRollTable, {
      myPeer,
      peers
    })));
  };
  const onPeerAction = (action, state) => {
    switch (action.type) {
      case PeerActions.CHANGE_NAME:
        handlePeerNameChange(action, state);
        return;
      case PeerActions.ROLL:
        handlePeerDiceRoll(action, state);
        return;
    }
  };
  const onConnectionOpen = (conn, state) => {
    const newPeer = state.peers.find((p) => p.connection.peer === conn.peer);
    const description = `${newPeer?.name ? `${newPeer.name} ` : ""}${conn.peer}`;
    toast({title: "Peer Connected", description, status: "info"});
  };
  const onConnectionClose = (conn, state) => {
    const closedPeer = state.peers.find((p) => p.connection.peer === conn.peer);
    const description = `${closedPeer?.name ? `${closedPeer.name} ` : ""}${conn.peer}`;
    toast({title: "Peer Disconnected", description, status: "error"});
  };
  return {render, onPeerAction, onConnectionOpen, onConnectionClose};
};
export default App;