import {
  PeerActions
} from "../types.js";
export function changeName(senderId, name) {
  return {type: PeerActions.CHANGE_NAME, senderId, name};
}
export function handlePeerNameChange(action, state) {
  const {senderId, name} = action;
  state.setPeers((latest) => {
    const changedPeerIndex = latest.findIndex((peer) => peer.connection.peer === senderId);
    if (changedPeerIndex === -1)
      return latest;
    const updatedPeer = {
      ...latest[changedPeerIndex],
      name
    };
    const updatedPeers = [...latest];
    updatedPeers[changedPeerIndex] = updatedPeer;
    return updatedPeers;
  });
}
