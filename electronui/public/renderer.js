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

  root.append(title, connectBtn);
  const row = document.createElement('div');
  row.append(input, sendBtn);
  root.append(row, logPre);

  function appendLog(msg) {
    logPre.textContent += msg + '\n';
  }

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

