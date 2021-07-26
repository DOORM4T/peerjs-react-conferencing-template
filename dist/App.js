import { Box, Heading } from "../snowpack/pkg/@chakra-ui/react.js";
import React from "../snowpack/pkg/react.js";
import usePeerDiceRoller from "./components/PeerDiceRollerDemo/usePeerDiceRoller.js";
import PeerContainer from "./components/PeerContainer/index.js";
import useConnectionHandlers from "./components/PeerContainer/useConnectionHandlers.js";

var App = function App() {
  var _useConnectionHandler = useConnectionHandlers(),
      onConnectionOpen = _useConnectionHandler.onConnectionOpen,
      onConnectionClose = _useConnectionHandler.onConnectionClose;

  var _usePeerDiceRoller = usePeerDiceRoller(),
      render = _usePeerDiceRoller.render,
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

export default App;