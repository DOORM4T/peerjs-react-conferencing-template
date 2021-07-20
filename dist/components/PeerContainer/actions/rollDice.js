import { produce } from "../../../../snowpack/pkg/immer.js";
import { PeerActions } from "../types.js";
export function rollDice(senderId, roll) {
  return {
    type: PeerActions.ROLL,
    senderId: senderId,
    roll: roll
  };
}
export function handlePeerDiceRoll(action, state) {
  var _ref = action,
      senderId = _ref.senderId,
      roll = _ref.roll;
  state.setPeers(function (latest) {
    return updatePeers(senderId, roll, latest);
  });
}

function updatePeers(senderId, roll, peers) {
  var nextState = produce(peers, function (draft) {
    var isSender = function isSender(peer) {
      return peer.connection.peer === senderId;
    };

    var peerIndex = draft.findIndex(isSender);
    if (peerIndex === -1) return;
    draft[peerIndex].latestRoll = roll;
  });
  return nextState;
}