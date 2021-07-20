export var PeerActions; // CUSTOM PEER ACTIONS WILL EXTEND THE FOLLOWING INTERFACE

(function (PeerActions) {
  PeerActions["SHARE_PEERS"] = "SHARE_PEERS";
  PeerActions["SHARE_MY_PEER_DATA"] = "SHARE_MY_PEER_DATA";
  PeerActions["CHANGE_NAME"] = "CHANGE_NAME";
  PeerActions["ROLL"] = "ROLL";
})(PeerActions || (PeerActions = {}));