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
  SHARE_MY_PEER_DATA = "SHARE_MY_PEER_DATA",
  CHANGE_NAME = "CHANGE_NAME",
}

// EXPORT CUSTOM ACTION CREATORS HERE
export const peerActionCreators = {
  sharePeers,
  shareMyPeerData,
  changeName,
}

export interface IConnectionAction {
  senderId: string
  type: PeerActions
}

export interface ISharePeersAction extends IConnectionAction {
  type: PeerActions.SHARE_PEERS
  peers: string[]
}
function sharePeers(senderId: string, peers: string[]): ISharePeersAction {
  return { type: PeerActions.SHARE_PEERS, senderId, peers }
}

export interface IShareMyPeerDataAction extends IConnectionAction {
  type: PeerActions
  data: IPeerData
}
function shareMyPeerData(
  senderId: string,
  data: IPeerData,
): IShareMyPeerDataAction {
  return { type: PeerActions.SHARE_MY_PEER_DATA, senderId, data }
}

export interface IChangeNameAction extends IConnectionAction {
  type: PeerActions.CHANGE_NAME
  name: string
}
function changeName(senderId: string, name: string): IChangeNameAction {
  return { type: PeerActions.CHANGE_NAME, senderId, name }
}
