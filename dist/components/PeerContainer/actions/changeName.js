import produce from "../../../../snowpack/pkg/immer.js";
import {
  PeerActions
} from "../types.js";
export function changeName(senderId, name) {
  return {type: PeerActions.CHANGE_NAME, senderId, name};
}
export function handlePeerNameChange(action, state) {
  const {senderId, name} = action;
  state.setPeers((latest) => updatePeers(senderId, name, latest));
}
function updatePeers(senderId, name, peers) {
  const nextState = produce(peers, (draft) => {
    const isSender = (peer) => peer.connection.peer === senderId;
    const peerIndex = draft.findIndex(isSender);
    if (peerIndex === -1)
      return;
    draft[peerIndex].name = name;
  });
  return nextState;
}
