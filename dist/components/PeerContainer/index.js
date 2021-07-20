import { Box, Button, Flex, FormControl, HStack, Input, Tooltip, useToast } from "../../../snowpack/pkg/@chakra-ui/react.js";
import React from "../../../snowpack/pkg/react.js";
import usePeerConnections from "./usePeerConnections.js";

function PeerContainer(_ref) {
  var onConnectionOpen = _ref.onConnectionOpen,
      onConnectionClose = _ref.onConnectionClose,
      onPeerAction = _ref.onPeerAction,
      render = _ref.render;
  var peerConnections = usePeerConnections({
    onConnectionOpen: onConnectionOpen,
    onConnectionClose: onConnectionClose,
    onPeerAction: onPeerAction
  });
  var peerState = peerConnections.state,
      connectToPeer = peerConnections.connectToPeer,
      disconnect = peerConnections.disconnect,
      hasPeer = peerConnections.hasPeer,
      initMyPeer = peerConnections.initMyPeer;
  var peers = peerState.peers,
      myPeer = peerState.myPeer,
      setMyPeer = peerState.setMyPeer,
      setPeers = peerState.setPeers;

  var handleConnectFormSubmit = function handleConnectFormSubmit(toConnectId) {
    if (hasPeer(toConnectId)) return;
    connectToPeer(toConnectId);
  };

  var hasPeers = peers.length > 0;

  if (myPeer && !myPeer.peerObj.id) {
    // Creating a new peer object with a random ID fails some times, causing the ID to be null
    return /*#__PURE__*/React.createElement("div", null, "Oops, Something broke! Please refresh the page.");
  }

  return /*#__PURE__*/React.createElement(Box, null, /*#__PURE__*/React.createElement(HStack, {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    mt: "1rem"
  }, myPeer && myPeer.peerObj.id && /*#__PURE__*/React.createElement(CopyMyIDInput, {
    myId: myPeer.peerObj.id
  }), !hasPeers && /*#__PURE__*/React.createElement(Button, {
    colorScheme: "yellow",
    onClick: initMyPeer
  }, "New ID")), /*#__PURE__*/React.createElement(Flex, {
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    mt: "1rem"
  }, /*#__PURE__*/React.createElement(PeerConnectForm, {
    handleSubmit: handleConnectFormSubmit,
    doShowDisconnect: hasPeers,
    disconnect: disconnect
  }), render && render({
    myPeer: myPeer,
    setMyPeer: setMyPeer,
    peers: peers,
    setPeers: setPeers
  })));
}

var CopyMyIDInput = function CopyMyIDInput(props) {
  var myId = props.myId;
  var toast = useToast();

  var handleCopy = function handleCopy(e) {
    e.currentTarget.select();
    document.execCommand("copy");
    toast({
      title: "Copied ID to clipboard!",
      status: "success",
      duration: 1000,
      isClosable: true,
      position: "top-right"
    });
  };

  return /*#__PURE__*/React.createElement(Tooltip, {
    label: "Click to copy!",
    placement: "right"
  }, /*#__PURE__*/React.createElement(Input, {
    ml: "1rem",
    value: myId,
    width: "auto",
    onClick: handleCopy,
    readOnly: true
  }));
};

var PeerConnectForm = function PeerConnectForm(_ref2) {
  var handleSubmit = _ref2.handleSubmit,
      doShowDisconnect = _ref2.doShowDisconnect,
      disconnect = _ref2.disconnect;

  var _handleSubmit = function _handleSubmit(e) {
    e.preventDefault();
    var toConnectId = e.target["peer-id"].value;
    handleSubmit(toConnectId);
  };

  return /*#__PURE__*/React.createElement("form", {
    action: "",
    onSubmit: _handleSubmit
  }, /*#__PURE__*/React.createElement(FormControl, {
    id: "peer-id"
  }, /*#__PURE__*/React.createElement(HStack, {
    alignItems: "center",
    justifyContent: "center"
  }, /*#__PURE__*/React.createElement(Input, {
    type: "text",
    onClick: function onClick(e) {
      e.currentTarget.select();
    }
  }), /*#__PURE__*/React.createElement(Button, {
    type: "submit",
    colorScheme: "telegram"
  }, "Connect"), doShowDisconnect && /*#__PURE__*/React.createElement(Button, {
    colorScheme: "red",
    onClick: disconnect
  }, "Disconnect"))));
};

export default PeerContainer;