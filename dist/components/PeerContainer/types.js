export var PeerActions;
(function(PeerActions2) {
  PeerActions2["SHARE_PEERS"] = "SHARE_PEERS";
  PeerActions2["SHARE_MY_PEER_DATA"] = "SHARE_MY_PEER_DATA";
  PeerActions2["CHANGE_NAME"] = "CHANGE_NAME";
  PeerActions2["ROLL"] = "ROLL";
})(PeerActions || (PeerActions = {}));
export const peerActionCreators = {
  sharePeers,
  shareMyPeerData,
  changeName,
  roll
};
function sharePeers(senderId, peers) {
  return {type: PeerActions.SHARE_PEERS, senderId, peers};
}
function shareMyPeerData(senderId, data) {
  return {type: PeerActions.SHARE_MY_PEER_DATA, senderId, data};
}
function changeName(senderId, name) {
  return {type: PeerActions.CHANGE_NAME, senderId, name};
}
function roll(senderId, roll2) {
  return {type: PeerActions.ROLL, senderId, roll: roll2};
}
