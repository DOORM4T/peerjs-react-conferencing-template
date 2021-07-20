import produce from "../../../../snowpack/pkg/immer.js";
import { PeerActions } from "../types.js";
export function changeName(senderId, name) {
  return {
    type: PeerActions.CHANGE_NAME,
    senderId: senderId,
    name: name
  };
}
export function handlePeerNameChange(action, state) {
  var _ref = action,
      senderId = _ref.senderId,
      name = _ref.name;
  state.setPeers(function (latest) {
    return updatePeers(senderId, name, latest);
  });
}

function updatePeers(senderId, name, peers) {
  var nextState = produce(peers, function (draft) {
    var isSender = function isSender(peer) {
      return peer.connection.peer === senderId;
    };

    var peerIndex = draft.findIndex(isSender);
    if (peerIndex === -1) return;
    draft[peerIndex].name = name;
  });
  return nextState;
}