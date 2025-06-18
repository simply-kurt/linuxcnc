import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';

function App() {
  const [connected, setConnected] = useState(false);
  const [log, setLog] = useState([]);
  const [command, setCommand] = useState('');

  const appendLog = (msg) => setLog((l) => [...l, msg]);

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

  return (
    <div>
      <h1>LinuxCNC Electron UI</h1>
      <button onClick={connect} disabled={connected}>Connect</button>
      <div>
        <input
          type="text"
          value={command}
          onChange={(e) => setCommand(e.target.value)}
        />
        <button onClick={send}>Send</button>
      </div>
      <pre>{log.join('\n')}</pre>
    </div>
  );
}

ReactDOM.render(<App />, document.getElementById('root'));
