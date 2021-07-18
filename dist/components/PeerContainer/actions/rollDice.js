import {produce} from "../../../pkg/immer.js";
import {
  PeerActions
} from "../types.js";
export function rollDice(senderId, roll) {
  return {type: PeerActions.ROLL, senderId, roll};
}
export function handlePeerDiceRoll(action, state) {
  const {senderId, roll} = action;
  state.setPeers((latest) => updatePeers(senderId, roll, latest));
}
function updatePeers(senderId, roll, peers) {
  const nextState = produce(peers, (draft) => {
    const isSender = (peer) => peer.connection.peer === senderId;
    const peerIndex = draft.findIndex(isSender);
    if (peerIndex === -1)
      return;
    draft[peerIndex].latestRoll = roll;
  });
  return nextState;
}
