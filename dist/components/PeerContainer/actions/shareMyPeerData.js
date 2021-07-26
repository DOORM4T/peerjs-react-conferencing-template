function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

import produce from "../../../../snowpack/pkg/immer.js";
import { PeerActions } from "../types.js";
export function shareMyPeerData(senderId, data) {
  return {
    type: PeerActions.SHARE_MY_PEER_DATA,
    senderId: senderId,
    data: data
  };
}
export function handleShareMyPeerData(action, state, onConnectionOpen) {
  var setPeers = state.setPeers;
  var _ref = action,
      senderId = _ref.senderId,
      data = _ref.data;

  var latestState = _objectSpread({}, state);

  var latestPeerIndex = latestState.peers.findIndex(function (p) {
    return p.connection.peer === senderId;
  });

  if (latestPeerIndex !== -1) {
    // This makes a newly added peer's state available to the client's onConnectionOpen handler
    // In summary:
    //  1. the handleConnectionOpen() function from usePeerConnections sends a "share my peer data" action. The connection is already open by this time.
    //  2. Clients receiving the "share my peer data" action can use the shared peer data in a custom onConnectionOpen() handler
    latestState.peers[latestPeerIndex].name = data.name;
    onConnectionOpen && onConnectionOpen();
  }

  setPeers(function (latest) {
    return _updatePeers(latest, senderId, data);
  });
  return;
}

function _updatePeers(latest, senderId, data) {
  return produce(latest, function (draft) {
    var peerIndex = draft.findIndex(function (p) {
      return p.connection.peer === senderId;
    });
    if (peerIndex === -1) return;
    draft[peerIndex] = _objectSpread(_objectSpread({}, draft[peerIndex]), data);
  });
}