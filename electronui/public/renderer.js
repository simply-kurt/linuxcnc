document.addEventListener('DOMContentLoaded', function () {
  const root = document.getElementById('root');
  const title = document.createElement('h1');
  title.textContent = 'LinuxCNC Electron UI';
  const connectBtn = document.createElement('button');
  connectBtn.textContent = 'Connect';
  const input = document.createElement('input');
  const sendBtn = document.createElement('button');
  sendBtn.textContent = 'Send';
  const logPre = document.createElement('pre');
  root.appendChild(title);
  root.appendChild(connectBtn);
  const row = document.createElement('div');
  row.appendChild(input);
  row.appendChild(sendBtn);
  root.appendChild(row);
  root.appendChild(logPre);

  const appendLog = function (msg) {
    logPre.textContent += msg + '\n';
  };

  connectBtn.addEventListener('click', function () {
    window.electronAPI.connect();
    connectBtn.disabled = true;
  sendBtn.addEventListener('click', function () {
    const cmd = input.value.trim();
    if (!cmd) return;
    window.electronAPI.sendCommand(cmd);
    appendLog('-> ' + cmd);
    input.value = '';
  window.electronAPI.onMessage(function (_event, msg) {
    appendLog('<- ' + msg);
});

