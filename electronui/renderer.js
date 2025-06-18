import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
function App() {
  const [connected, setConnected] = useState(false);
  const [log, setLog] = useState([]);
  const [command, setCommand] = useState('');
  const appendLog = msg => setLog(l => [...l, msg]);
  useEffect(() => {
    window.electronAPI.onMessage((event, msg) => {
      appendLog('<- ' + msg);
    });
  }, []);
  const connect = () => {
    window.electronAPI.connect();
    setConnected(true);
  };
  const send = () => {
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
    onChange: e => setCommand(e.target.value)
  }), /*#__PURE__*/React.createElement("button", {
    onClick: send
  }, "Send")), /*#__PURE__*/React.createElement("pre", null, log.join('\n')));
}
ReactDOM.render(/*#__PURE__*/React.createElement(App, null), document.getElementById('root'));
