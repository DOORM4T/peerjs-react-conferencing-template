import { produce } from "immer"
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

  state.setPeers((latest) => updatePeers(senderId, roll, latest))
}

function updatePeers(
  senderId: string,
  roll: number,
  peers: (IPeerConnection & IPeerData)[],
) {
  const nextState = produce(peers, (draft) => {
    const isSender = (peer: IPeerConnection) =>
      peer.connection.peer === senderId
    const peerIndex = draft.findIndex(isSender)
    if (peerIndex === -1) return
    draft[peerIndex].latestRoll = roll
  })
  return nextState
}
