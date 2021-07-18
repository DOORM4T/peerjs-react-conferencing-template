import {
  IPeerAction,
  IPeerConnection,
  IPeerData,
  IPeerState,
  PeerActions,
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

  state.setPeers((latest) => {
    const changedPeerIndex = latest.findIndex(
      (peer) => peer.connection.peer === senderId,
    )
    if (changedPeerIndex === -1) return latest
    const updatedPeer: IPeerConnection & IPeerData = {
      ...latest[changedPeerIndex],
      name,
    }
    const updatedPeers = [...latest]
    updatedPeers[changedPeerIndex] = updatedPeer
    return updatedPeers
  })
}
