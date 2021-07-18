import {
  Box,
  Button,
  Flex,
  FormControl,
  HStack,
  Input,
  Tooltip,
  useToast
} from "../../pkg/@chakra-ui/react.js";
import React from "../../pkg/react.js";
import usePeerConnections from "./usePeerConnections.js";
function PeerContainer({
  onConnectionOpen,
  onConnectionClose,
  onPeerAction,
  render
}) {
  const peerConnections = usePeerConnections({
    onConnectionOpen,
    onConnectionClose,
    onPeerAction
  });
  const {
    state: peerState,
    connectToPeer,
    disconnect,
    hasPeer,
    initMyPeer
  } = peerConnections;
  const {peers, myPeer, setMyPeer, setPeers} = peerState;
  const handleConnectFormSubmit = (toConnectId) => {
    if (hasPeer(toConnectId))
      return;
    connectToPeer(toConnectId);
  };
  const hasPeers = peers.length > 0;
  if (myPeer && !myPeer.peerObj.id) {
    return /* @__PURE__ */ React.createElement("div", null, "Oops, Something broke! Please refresh the page.");
  }
  return /* @__PURE__ */ React.createElement(Box, null, /* @__PURE__ */ React.createElement(HStack, {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    mt: "1rem"
  }, myPeer && myPeer.peerObj.id && /* @__PURE__ */ React.createElement(CopyMyIDInput, {
    myId: myPeer.peerObj.id
  }), !hasPeers && /* @__PURE__ */ React.createElement(Button, {
    colorScheme: "yellow",
    onClick: initMyPeer
  }, "New ID")), /* @__PURE__ */ React.createElement(Flex, {
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    mt: "1rem"
  }, /* @__PURE__ */ React.createElement(PeerConnectForm, {
    handleSubmit: handleConnectFormSubmit,
    doShowDisconnect: hasPeers,
    disconnect
  }), render && render({myPeer, setMyPeer, peers, setPeers})));
}
const CopyMyIDInput = (props) => {
  const {myId} = props;
  const toast = useToast();
  const handleCopy = (e) => {
    e.currentTarget.select();
    document.execCommand("copy");
    toast({
      title: "Copied ID to clipboard!",
      status: "success",
      duration: 1e3,
      isClosable: true,
      position: "top-right"
    });
  };
  return /* @__PURE__ */ React.createElement(Tooltip, {
    label: "Click to copy!",
    placement: "right"
  }, /* @__PURE__ */ React.createElement(Input, {
    ml: "1rem",
    value: myId,
    width: "auto",
    onClick: handleCopy,
    readOnly: true
  }));
};
const PeerConnectForm = ({
  handleSubmit,
  doShowDisconnect,
  disconnect
}) => {
  const _handleSubmit = (e) => {
    e.preventDefault();
    const toConnectId = e.target["peer-id"].value;
    handleSubmit(toConnectId);
  };
  return /* @__PURE__ */ React.createElement("form", {
    action: "",
    onSubmit: _handleSubmit
  }, /* @__PURE__ */ React.createElement(FormControl, {
    id: "peer-id"
  }, /* @__PURE__ */ React.createElement(HStack, {
    alignItems: "center",
    justifyContent: "center"
  }, /* @__PURE__ */ React.createElement(Input, {
    type: "text",
    onClick: (e) => {
      e.currentTarget.select();
    }
  }), /* @__PURE__ */ React.createElement(Button, {
    type: "submit",
    colorScheme: "telegram"
  }, "Connect"), doShowDisconnect && /* @__PURE__ */ React.createElement(Button, {
    colorScheme: "red",
    onClick: disconnect
  }, "Disconnect"))));
};
export default PeerContainer;
