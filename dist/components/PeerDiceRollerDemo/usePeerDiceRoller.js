import React from "../../../snowpack/pkg/react.js";
import { handlePeerNameChange, useHandleNameChange } from "../PeerContainer/actions/changeName.js";
import { handlePeerDiceRoll, useHandleDiceRoll } from "../PeerContainer/actions/rollDice.js";
import { PeerActions } from "../PeerContainer/types.js";
import { isMyPeerValid } from "../PeerContainer/utils.js";
import AppWrapper from "./AppWrapper.js";

var usePeerDiceRoller = function usePeerDiceRoller() {
  var render = function render(props) {
    var myPeer = props.myPeer,
        peers = props.peers;

    var _useHandleNameChange = useHandleNameChange(props),
        handleNameChange = _useHandleNameChange.handleNameChange;

    var _useHandleDiceRoll = useHandleDiceRoll(props),
        handleDiceRoll = _useHandleDiceRoll.handleDiceRoll;

    if (!isMyPeerValid(myPeer)) return null;
    return /*#__PURE__*/React.createElement(AppWrapper, {
      handleNameChange: handleNameChange,
      handleDiceRoll: handleDiceRoll,
      myPeer: myPeer,
      peers: peers
    });
  };

  var onPeerAction = function onPeerAction(action, state) {
    switch (action.type) {
      case PeerActions.CHANGE_NAME:
        handlePeerNameChange(action, state);
        return;

      case PeerActions.ROLL:
        handlePeerDiceRoll(action, state);
        return;
    }
  };

  return {
    render: render,
    onPeerAction: onPeerAction
  };
};

export default usePeerDiceRoller;