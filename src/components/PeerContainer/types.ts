import Peer from "peerjs"

export type CustomPeerActionHandler = (
  action: IConnectionAction,
  state: IPeerState,
) => void

export interface IPeerState {
  myPeer: (IMyPeer & IPeerData) | null
  setMyPeer: React.Dispatch<React.SetStateAction<(IMyPeer & IPeerData) | null>>
  peers: (IPeerConnection & IPeerData)[]
  setPeers: React.Dispatch<
    React.SetStateAction<(IPeerConnection & IPeerData)[]>
  >
}

export interface IPeerData {
  name?: string
  // ADDITIONAL PEER DATA GOES HERE
}

export interface IMyPeer {
  peerObj: Peer
}

export interface IPeerConnection {
  connection: Peer.DataConnection
}

export enum PeerActions {
  SHARE_PEERS = "SHARE_PEERS",

  // ADD CUSTOM PEER ACTION TYPES BELOW
  CHANGE_NAME = "CHANGE_NAME",
}

// EXPORT CUSTOM ACTION CREATORS HERE
export const peerActionCreators = {
  sharePeers,
  changeName,
}

export interface IConnectionAction {
  senderId: string
  type: PeerActions
}

export type PeerDataToShare = { peerId: string } & IPeerData
export interface ISharePeersAction extends IConnectionAction {
  type: PeerActions.SHARE_PEERS
  toShare: PeerDataToShare[]
}
function sharePeers(
  senderId: string,
  peers: (IPeerConnection & IPeerData)[],
): ISharePeersAction {
  const toShare = peers.map((c) => {
    const toShare: any = { ...c }
    toShare.peerId = c.connection.peer
    delete toShare.connection
    return toShare as PeerDataToShare
  })

  return { type: PeerActions.SHARE_PEERS, senderId, toShare }
}

export interface IChangeNameAction extends IConnectionAction {
  type: PeerActions.CHANGE_NAME
  name: string
}
function changeName(senderId: string, name: string): IChangeNameAction {
  return { type: PeerActions.CHANGE_NAME, senderId, name }
}
