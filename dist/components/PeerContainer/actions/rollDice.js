function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

import { produce } from "../../../../snowpack/pkg/immer.js";
import { PeerActions } from "../types.js";
import { isMyPeerValid } from "../utils.js";

function _rollDice(senderId, roll) {
  return {
    type: PeerActions.ROLL,
    senderId: senderId,
    roll: roll
  };
}

export function handlePeerDiceRoll(action, state) {
  var _ref = action,
      senderId = _ref.senderId,
      roll = _ref.roll;
  state.setPeers(function (latest) {
    return _updatePeers(senderId, roll, latest);
  });
}
export var useHandleDiceRoll = function useHandleDiceRoll(props) {
  var setMyPeer = props.setMyPeer,
      myPeer = props.myPeer,
      peers = props.peers;

  var handleDiceRoll = function handleDiceRoll() {
    if (!isMyPeerValid(myPeer)) return;
    var roll = Math.floor(Math.random() * (20 - 1)) + 1;
    setMyPeer(function (latest) {
      return _objectSpread(_objectSpread({}, latest), {}, {
        latestRoll: roll
      });
    });
    var rollDiceAction = JSON.stringify(_rollDice(myPeer.peerObj.id, roll));
    peers.forEach(function (p) {
      return p.connection.send(rollDiceAction);
    });
  };

  return {
    handleDiceRoll: handleDiceRoll
  };
};

function _updatePeers(senderId, roll, peers) {
  var nextState = produce(peers, function (draft) {
    var isSender = function isSender(peer) {
      return peer.connection.peer === senderId;
    };

    var peerIndex = draft.findIndex(isSender);
    if (peerIndex === -1) return;
    draft[peerIndex].latestRoll = roll;
  });
  return nextState;
}