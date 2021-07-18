import {PeerActions} from "../types.js";
export function shareMyPeerData(senderId, data) {
  return {type: PeerActions.SHARE_MY_PEER_DATA, senderId, data};
}
