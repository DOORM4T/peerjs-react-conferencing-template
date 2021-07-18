import {Table, Tbody, Td, Th, Thead, Tr} from "../../pkg/@chakra-ui/react.js";
import React from "../../pkg/react.js";
const ConnectionsTable = (props) => {
  const {myPeer, peers} = props;
  return /* @__PURE__ */ React.createElement(Table, {
    size: "md",
    variant: "striped",
    color: "black",
    colorScheme: "teal",
    bg: "white",
    rounded: "md"
  }, /* @__PURE__ */ React.createElement(Thead, null, /* @__PURE__ */ React.createElement(Tr, null, /* @__PURE__ */ React.createElement(Th, null, "ID"), /* @__PURE__ */ React.createElement(Th, null, "Name"), /* @__PURE__ */ React.createElement(Th, null, "Roll"))), /* @__PURE__ */ React.createElement(Tbody, null, /* @__PURE__ */ React.createElement(Tr, null, /* @__PURE__ */ React.createElement(Td, null, myPeer.peerObj.id), /* @__PURE__ */ React.createElement(Td, null, myPeer.name || "-"), /* @__PURE__ */ React.createElement(Td, null, myPeer.latestRoll || "-")), peers.map((p) => /* @__PURE__ */ React.createElement(Tr, {
    key: p.connection.peer
  }, /* @__PURE__ */ React.createElement(Td, null, p.connection.peer), /* @__PURE__ */ React.createElement(Td, null, p.name || "-"), /* @__PURE__ */ React.createElement(Td, null, p.latestRoll || "-")))));
};
export default ConnectionsTable;
