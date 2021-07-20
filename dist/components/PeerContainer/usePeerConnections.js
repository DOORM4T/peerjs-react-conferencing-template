var _excluded = ["peerObj"];

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

import produce from "../../../snowpack/pkg/immer.js";
import { nanoid } from "../../../snowpack/pkg/nanoid.js";
import Peer from "../../../snowpack/pkg/peerjs.js";
import { useEffect, useRef, useState } from "../../../snowpack/pkg/react.js";
import { shareMyPeerData } from "./actions/shareMyPeerData.js";
import { sharePeers } from "./actions/sharePeers.js";
import { PeerActions } from "./types.js";

var usePeerConnections = function usePeerConnections(props) {
  var _useState = useState(null),
      _useState2 = _slicedToArray(_useState, 2),
      myPeer = _useState2[0],
      setMyPeer = _useState2[1];

  var latestMyPeer = useRef(null);
  useEffect(function () {
    // Track latest myPeer state in a ref so we can access it in listeners or other functions that rely on it
    latestMyPeer.current = myPeer;
  }, [myPeer]);

  var initMyPeer = function initMyPeer() {
    var _latestMyPeer$current;

    if ((_latestMyPeer$current = latestMyPeer.current) !== null && _latestMyPeer$current !== void 0 && _latestMyPeer$current.peerObj) latestMyPeer.current.peerObj.destroy();
    var peerObj = new Peer(nanoid(props.idLength || 10));
    listenForConnections(peerObj); // A peer's name will be their ID by default

    setMyPeer({
      peerObj: peerObj
    });
  };

  useEffect(initMyPeer, []);

  var _useState3 = useState([]),
      _useState4 = _slicedToArray(_useState3, 2),
      peers = _useState4[0],
      setPeers = _useState4[1];

  var latestPeers = useRef([]);
  useEffect(function () {
    // Track latest connections state in a ref so we can access it in listeners or other functions that rely on it
    latestPeers.current = peers;
  }, [peers]);

  var addConnection = function addConnection(conn) {
    var updatedConnections = latestPeers.current.concat({
      connection: conn
    });
    setPeers(updatedConnections);
  };

  var removeConnection = function removeConnection(conn) {
    setPeers(latestPeers.current.filter(function (c) {
      return c.connection.peer !== conn.peer;
    }));
  };

  var hasPeer = function hasPeer(peer) {
    var _latestMyPeer$current2;

    var isMyPeer = peer === ((_latestMyPeer$current2 = latestMyPeer.current) === null || _latestMyPeer$current2 === void 0 ? void 0 : _latestMyPeer$current2.peerObj.id);
    var hasPeer = latestPeers.current.some(function (c) {
      return c.connection.peer === peer;
    });
    return isMyPeer || hasPeer;
  };

  var disconnect = function disconnect() {
    var toDisconnect = latestPeers.current;
    toDisconnect.forEach(function (conn) {
      return conn.connection.close();
    });
    setPeers([]);
  };

  var getState = function getState() {
    return {
      myPeer: latestMyPeer.current,
      setMyPeer: setMyPeer,
      peers: latestPeers.current,
      setPeers: setPeers
    };
  };

  var listenForConnections = function listenForConnections(callee) {
    return callee.on("connection", handleConnection);
  };

  var connectToPeer = function connectToPeer(toConnectId) {
    if (!latestMyPeer.current) return;
    var conn = latestMyPeer.current.peerObj.connect(toConnectId);
    handleConnection(conn);
  };

  var handleConnectionOpen = function handleConnectionOpen(conn) {
    var _latestMyPeer$current3;

    var myId = (_latestMyPeer$current3 = latestMyPeer.current) === null || _latestMyPeer$current3 === void 0 ? void 0 : _latestMyPeer$current3.peerObj.id;
    if (!myId) return;
    if (hasPeer(conn.peer)) return;
    addConnection(conn);
    console.log("Connected with ".concat(conn.peer)); // Share my peers with the new peer -- this allows them to join group connections
    // This conferencing method follows a mesh topology, which might not be suitable for large groups

    var sharePeersAction = JSON.stringify(sharePeers(myId, latestPeers.current.map(function (c) {
      return c.connection.peer;
    })));
    conn.send(sharePeersAction); // Share extra peer data with the peer
    // Non-Peer.JS data such as this peer's name
    // IMPORTANT: the custom onConnectionOpen callback is actually called in handleConnectionData
    //  This ensures the newly connected peer can react to the new connection while having access to this peer's latest data
    //  Otherwise, fields like 'name' wouldn't be up to date when the peer calls onConnectionOpen from this function
    // The following line extracts ONLY IPeerData fields. IMyPeer type fields like peerObj won't be used here.
    // This prevents JSON stringify circular structure bugs, which can prevent new peers from seeing shared data upon connecting

    var _latestMyPeer$current4 = _objectSpread({}, latestMyPeer.current),
        _ = _latestMyPeer$current4.peerObj,
        myPeerData = _objectWithoutProperties(_latestMyPeer$current4, _excluded);

    var shareMyPeerDataAction = JSON.stringify(shareMyPeerData(myId, myPeerData));
    conn.send(shareMyPeerDataAction);
    console.log("Shared peers with ".concat(conn.peer));
  };

  var handleConnectionData = function handleConnectionData(conn, data) {
    console.log("[".concat(conn.peer, "]: ").concat(data));
    var action = JSON.parse(data);

    switch (action.type) {
      case PeerActions.SHARE_PEERS:
        {
          var _ref = action,
              _peers = _ref.peers;

          _peers.forEach(function (peer) {
            if (hasPeer(peer) || !latestMyPeer.current) return;
            console.log("Connecting with shared peer ".concat(peer));
            connectToPeer(peer);
          });

          return;
        }

      case PeerActions.SHARE_MY_PEER_DATA:
        {
          var _ref2 = action,
              senderId = _ref2.senderId,
              _data = _ref2.data;

          var latestState = _objectSpread({}, getState());

          var latestPeerIndex = latestState.peers.findIndex(function (p) {
            return p.connection.peer === senderId;
          });

          if (latestPeerIndex !== -1) {
            latestState.peers[latestPeerIndex].name = _data.name;
            props.onConnectionOpen && props.onConnectionOpen(conn, latestState);
          }

          setPeers(function (latest) {
            return produce(latest, function (draft) {
              var peerIndex = draft.findIndex(function (p) {
                return p.connection.peer === senderId;
              });
              if (peerIndex === -1) return;
              draft[peerIndex] = _objectSpread(_objectSpread({}, draft[peerIndex]), _data);
            });
          });
          return;
        }
    }

    props.onPeerAction && props.onPeerAction(action, getState());
  };

  var handleConnectionClose = function handleConnectionClose(conn) {
    props.onConnectionClose && props.onConnectionClose(conn, getState());
    removeConnection(conn);
    console.log("Disconnected from ".concat(conn.peer));
  };

  var handleConnection = function handleConnection(conn) {
    conn.on("open", function () {
      return handleConnectionOpen(conn);
    });
    conn.on("data", function (data) {
      return handleConnectionData(conn, data);
    });
    conn.on("close", function () {
      return handleConnectionClose(conn);
    });
    conn.on("error", console.error);
  };

  return {
    state: {
      myPeer: myPeer,
      setMyPeer: setMyPeer,
      peers: peers,
      setPeers: setPeers
    },
    connectToPeer: connectToPeer,
    disconnect: disconnect,
    hasPeer: hasPeer,
    initMyPeer: initMyPeer
  };
};

export default usePeerConnections;