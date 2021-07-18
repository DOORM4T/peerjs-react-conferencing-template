import {PeerActions} from "../types.js";
export function sharePeers(senderId, peers) {
  return {type: PeerActions.SHARE_PEERS, senderId, peers};
}
