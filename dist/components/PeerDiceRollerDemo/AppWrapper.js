import { Box, Button, Heading, HStack, Input, useBreakpointValue } from "../../../snowpack/pkg/@chakra-ui/react.js";
import React from "../../../snowpack/pkg/react.js";
import DiceRollTable from "./DiceRollTable.js";

var AppWrapper = function AppWrapper(props) {
  var handleNameChange = props.handleNameChange,
      handleDiceRoll = props.handleDiceRoll,
      myPeer = props.myPeer,
      peers = props.peers;
  return /*#__PURE__*/React.createElement(Box, {
    width: useBreakpointValue({
      sm: "sm",
      md: "md",
      lg: "lg"
    }),
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

export default AppWrapper;