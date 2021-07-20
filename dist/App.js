function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

import { Box, Button, Heading, HStack, Input, useToast } from "../snowpack/pkg/@chakra-ui/react.js";
import React from "../snowpack/pkg/react.js";
import PeerContainer from "./components/PeerContainer/index.js";
import { changeName, handlePeerNameChange } from "./components/PeerContainer/actions/changeName.js";
import { handlePeerDiceRoll, rollDice } from "./components/PeerContainer/actions/rollDice.js";
import DiceRollTable from "./components/PeerContainer/DiceRollTable.js";
import { PeerActions } from "./components/PeerContainer/types.js";

var App = function App() {
  var _usePeerDiceRoller = usePeerDiceRoller(),
      render = _usePeerDiceRoller.render,
      onConnectionOpen = _usePeerDiceRoller.onConnectionOpen,
      onConnectionClose = _usePeerDiceRoller.onConnectionClose,
      onPeerAction = _usePeerDiceRoller.onPeerAction;

  return /*#__PURE__*/React.createElement(Box, {
    width: "100vw",
    minHeight: "100vh",
    bg: "linear-gradient(90deg, rgba(131,58,180,1) 0%, rgba(253,29,29,1) 50%, rgba(252,176,69,1) 100%);",
    color: "white",
    textAlign: "center"
  }, /*#__PURE__*/React.createElement(Heading, {
    pt: "1rem"
  }, "PeerJS-React Template"), /*#__PURE__*/React.createElement(PeerContainer, {
    render: render,
    onPeerAction: onPeerAction,
    onConnectionOpen: onConnectionOpen,
    onConnectionClose: onConnectionClose
  }));
};

var usePeerDiceRoller = function usePeerDiceRoller() {
  var toast = useToast({
    duration: 9000,
    isClosable: true,
    position: "top-right"
  });

  var render = function render(_ref) {
    var myPeer = _ref.myPeer,
        peers = _ref.peers,
        setMyPeer = _ref.setMyPeer,
        setPeers = _ref.setPeers;
    if (!myPeer || !myPeer.peerObj || !myPeer.peerObj.id) return null;

    var handleDiceRoll = function handleDiceRoll() {
      var roll = Math.floor(Math.random() * (20 - 1)) + 1;
      setMyPeer(function (latest) {
        return _objectSpread(_objectSpread({}, latest), {}, {
          latestRoll: roll
        });
      });
      var action = JSON.stringify(rollDice(myPeer.peerObj.id, roll));
      peers.forEach(function (p) {
        return p.connection.send(action);
      });
    };

    var handleNameChange = function handleNameChange(e) {
      var value = e.currentTarget.value;
      setMyPeer(function (latest) {
        return _objectSpread(_objectSpread({}, latest), {}, {
          name: value
        });
      });
      var changeNameAction = JSON.stringify(changeName(myPeer.peerObj.id, value));
      peers.forEach(function (p) {
        return p.connection.send(changeNameAction);
      });
    };

    return /*#__PURE__*/React.createElement(Box, {
      width: "lg",
      mt: "3rem"
    }, /*#__PURE__*/React.createElement("hr", null), /*#__PURE__*/React.createElement(Heading, {
      size: "lg",
      mt: "1rem"
    }, "Demo: Dice Roller"), /*#__PURE__*/React.createElement(HStack, {
      mt: "1rem"
    }, /*#__PURE__*/React.createElement(Input, {
      placeholder: "Custom name",
      onChange: handleNameChange
    }), /*#__PURE__*/React.createElement(Button, {
      colorScheme: "yellow",
      onClick: handleDiceRoll
    }, "Roll")), /*#__PURE__*/React.createElement(Box, {
      mt: "1rem"
    }, /*#__PURE__*/React.createElement(DiceRollTable, {
      myPeer: myPeer,
      peers: peers
    })));
  };

  var onPeerAction = function onPeerAction(action, state) {
    switch (action.type) {
      case PeerActions.CHANGE_NAME:
        handlePeerNameChange(action, state);
        return;

      case PeerActions.ROLL:
        handlePeerDiceRoll(action, state);
        return;
    }
  };

  var onConnectionOpen = function onConnectionOpen(conn, state) {
    var newPeer = state.peers.find(function (p) {
      return p.connection.peer === conn.peer;
    });
    var description = "".concat(newPeer !== null && newPeer !== void 0 && newPeer.name ? "".concat(newPeer.name, " ") : "").concat(conn.peer);
    toast({
      title: "Peer Connected",
      description: description,
      status: "info"
    });
  };

  var onConnectionClose = function onConnectionClose(conn, state) {
    var closedPeer = state.peers.find(function (p) {
      return p.connection.peer === conn.peer;
    });
    var description = "".concat(closedPeer !== null && closedPeer !== void 0 && closedPeer.name ? "".concat(closedPeer.name, " ") : "").concat(conn.peer);
    toast({
      title: "Peer Disconnected",
      description: description,
      status: "error"
    });
  };

  return {
    render: render,
    onPeerAction: onPeerAction,
    onConnectionOpen: onConnectionOpen,
    onConnectionClose: onConnectionClose
  };
};

export default App;