import {
  IPeerAction,
  IPeerConnection,
  IPeerData,
  IPeerState,
  PeerActions,
} from "../types"

export interface IRollDiceAction extends IPeerAction {
  type: PeerActions.ROLL
  roll: number
}
export function rollDice(senderId: string, roll: number): IRollDiceAction {
  return { type: PeerActions.ROLL, senderId, roll }
}

export function handlePeerDiceRoll(action: IPeerAction, state: IPeerState) {
  const { senderId, roll } = action as IRollDiceAction

  state.setPeers((latest) => {
    const changedPeerIndex = latest.findIndex(
      (peer) => peer.connection.peer === senderId,
    )
    if (changedPeerIndex === -1) return latest
    const updatedPeer: IPeerConnection & IPeerData = {
      ...latest[changedPeerIndex],
      latestRoll: roll,
    }
    const updatedPeers = [...latest]
    updatedPeers[changedPeerIndex] = updatedPeer
    return updatedPeers
  })
}
