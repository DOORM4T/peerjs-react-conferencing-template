import Peer from "peerjs"

export type CustomConnectionHandler = (
  conn: Peer.DataConnection,
  state: IPeerState,
) => void

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
  latestRoll?: number
}

export interface IMyPeer {
  peerObj: Peer
}

export interface IPeerConnection {
  connection: Peer.DataConnection
}

export enum PeerActions {
  SHARE_PEERS = "SHARE_PEERS",
  SHARE_MY_PEER_DATA = "SHARE_MY_PEER_DATA",
  CHANGE_NAME = "CHANGE_NAME",

  // ADD CUSTOM PEER ACTION TYPES BELOW
  ROLL = "ROLL",
}

export const peerActionCreators = {
  sharePeers,
  shareMyPeerData,
  changeName,

  // EXPORT CUSTOM ACTION CREATORS BELOW
  roll,
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

export interface IRollAction extends IConnectionAction {
  type: PeerActions.ROLL
  roll: number
}
function roll(senderId: string, roll: number): IRollAction {
  return { type: PeerActions.ROLL, senderId, roll }
}

// CREATE CUSTOM ACTIONS AND ACTION CREATORS BELOW
