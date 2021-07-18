import { IPeerAction, PeerActions, IPeerData } from "../types"

export interface IShareMyPeerDataAction extends IPeerAction {
  type: PeerActions
  data: IPeerData
}

export function shareMyPeerData(
  senderId: string,
  data: IPeerData,
): IShareMyPeerDataAction {
  return { type: PeerActions.SHARE_MY_PEER_DATA, senderId, data }
}
