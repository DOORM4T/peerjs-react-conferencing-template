function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

import produce from "../../../../snowpack/pkg/immer.js";
import { PeerActions } from "../types.js";
import { isMyPeerValid } from "../utils.js";

function _changeName(senderId, name) {
  return {
    type: PeerActions.CHANGE_NAME,
    senderId: senderId,
    name: name
  };
}

export function handlePeerNameChange(action, state) {
  var _ref = action,
      senderId = _ref.senderId,
      name = _ref.name;
  state.setPeers(function (latest) {
    return _updatePeers(senderId, name, latest);
  });
}
export var useHandleNameChange = function useHandleNameChange(props) {
  var setMyPeer = props.setMyPeer,
      myPeer = props.myPeer,
      peers = props.peers;

  var handleNameChange = function handleNameChange(e) {
    if (!isMyPeerValid(myPeer)) return;
    var value = e.currentTarget.value;
    setMyPeer(function (latest) {
      return _objectSpread(_objectSpread({}, latest), {}, {
        name: value
      });
    });
    var changeNameAction = JSON.stringify(_changeName(myPeer.peerObj.id, value));
    peers.forEach(function (p) {
      return p.connection.send(changeNameAction);
    });
  };

  return {
    handleNameChange: handleNameChange
  };
};

function _updatePeers(senderId, name, peers) {
  var nextState = produce(peers, function (draft) {
    var isSender = function isSender(peer) {
      return peer.connection.peer === senderId;
    };

    var peerIndex = draft.findIndex(isSender);
    if (peerIndex === -1) return;
    draft[peerIndex].name = name;
  });
  return nextState;
}