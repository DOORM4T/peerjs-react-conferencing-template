export type CustomPeerActionHandler = (action: IConnectionAction) => void

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
  type: PeerActions
}

export interface ISharePeersAction extends IConnectionAction {
  type: PeerActions.SHARE_PEERS
  peers: string[]
}
function sharePeers(peers: string[]): ISharePeersAction {
  return { type: PeerActions.SHARE_PEERS, peers }
}

export interface IChangeNameAction extends IConnectionAction {
  type: PeerActions.CHANGE_NAME
  name: string
}
function changeName(name: string): IChangeNameAction {
  return { type: PeerActions.CHANGE_NAME, name }
}
