function _toConsumableArray(r) { return _arrayWithoutHoles(r) || _iterableToArray(r) || _unsupportedIterableToArray(r) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _iterableToArray(r) { if ("undefined" != typeof Symbol && null != r[Symbol.iterator] || null != r["@@iterator"]) return Array.from(r); }
function _arrayWithoutHoles(r) { if (Array.isArray(r)) return _arrayLikeToArray(r); }
function _slicedToArray(r, e) { return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(r) { if (Array.isArray(r)) return r; }
import React, { useState, useEffect } from 'react';
import { createRoot } from 'react-dom/client';
function App() {
  var _useState = useState(false),
    _useState2 = _slicedToArray(_useState, 2),
    connected = _useState2[0],
    setConnected = _useState2[1];
  var _useState3 = useState([]),
    _useState4 = _slicedToArray(_useState3, 2),
    log = _useState4[0],
    setLog = _useState4[1];
  var _useState5 = useState(''),
    _useState6 = _slicedToArray(_useState5, 2),
    command = _useState6[0],
    setCommand = _useState6[1];
  var appendLog = function appendLog(msg) {
    return setLog(function (l) {
      return [].concat(_toConsumableArray(l), [msg]);
    });
  };
  useEffect(function () {
    window.electronAPI.onMessage(function (event, msg) {
      appendLog('<- ' + msg);
    });
  }, []);
  var connect = function connect() {
    window.electronAPI.connect();
    setConnected(true);
  };
  var send = function send() {
    window.electronAPI.sendCommand(command);
    appendLog('-> ' + command);
    setCommand('');
  };
  return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("h1", null, "LinuxCNC Electron UI"), /*#__PURE__*/React.createElement("button", {
    onClick: connect,
    disabled: connected
  }, "Connect"), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("input", {
    type: "text",
    value: command,
    onChange: function onChange(e) {
      return setCommand(e.target.value);
    }
  }), /*#__PURE__*/React.createElement("button", {
    onClick: send
  }, "Send")), /*#__PURE__*/React.createElement("pre", null, log.join('\n')));
}
var root = createRoot(document.getElementById('root'));
root.render(/*#__PURE__*/React.createElement(App, null));
