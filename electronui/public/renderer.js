document.addEventListener('DOMContentLoaded', function () {
  const { React, ReactDOM, electronAPI } = window;
  function App() {
    const [log, setLog] = React.useState([]);
    const [cmd, setCmd] = React.useState('');

    React.useEffect(() => {
      electronAPI.onMessage(function (_e, msg) {
        setLog((l) => [...l, '<- ' + msg]);
      });
    }, []);

    function connect() {
      electronAPI.connect();
    }

    function send() {
      const c = cmd.trim();
      if (!c) return;
      electronAPI.sendCommand(c);
      setLog((l) => [...l, '-> ' + c]);
      setCmd('');
    }
    return React.createElement(
      'div',
      null,
      React.createElement('h1', null, 'LinuxCNC Electron UI'),
      React.createElement('button', { onClick: connect }, 'Connect'),
      React.createElement(
        'div',
        null,
        React.createElement('input', {
          value: cmd,
          onChange: (e) => setCmd(e.target.value)
        }),
        React.createElement('button', { onClick: send }, 'Send')
      ),
      React.createElement('pre', null, log.join('\n'))
    );
  }
  const rootElem = document.getElementById('root');
  const root = ReactDOM.createRoot(rootElem);
  root.render(React.createElement(App));
