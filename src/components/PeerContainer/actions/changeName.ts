import produce from "immer"
import {
  IPeerAction,
  IPeerConnection,
  IPeerData,
  IPeerState,
  PeerActions
} from "../types"

export interface IChangeNameAction extends IPeerAction {
  type: PeerActions.CHANGE_NAME
  name: string
}
export function changeName(senderId: string, name: string): IChangeNameAction {
  return { type: PeerActions.CHANGE_NAME, senderId, name }
}

export function handlePeerNameChange(action: IPeerAction, state: IPeerState) {
  const { senderId, name } = action as IChangeNameAction
  state.setPeers((latest) => updatePeers(senderId, name, latest))
}

function updatePeers(
  senderId: string,
  name: string,
  peers: (IPeerConnection & IPeerData)[],
) {
  const nextState = produce(peers, (draft) => {
    const isSender = (peer: IPeerConnection) =>
      peer.connection.peer === senderId
    const peerIndex = draft.findIndex(isSender)
    if (peerIndex === -1) return
    draft[peerIndex].name = name
  })
  return nextState
}