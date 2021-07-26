import { useToast } from "../../../snowpack/pkg/@chakra-ui/react.js";

var useConnectionHandlers = function useConnectionHandlers() {
  var toast = useToast({
    duration: 9000,
    isClosable: true,
    position: "top-right"
  });

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
    onConnectionOpen: onConnectionOpen,
    onConnectionClose: onConnectionClose
  };
};

export default useConnectionHandlers;