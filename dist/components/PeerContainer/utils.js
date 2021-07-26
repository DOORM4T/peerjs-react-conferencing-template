export function isMyPeerValid(myPeer) {
  return myPeer && myPeer.peerObj && myPeer.peerObj.id;
}