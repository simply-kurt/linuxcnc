const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('electronAPI', {
  connect: () => ipcRenderer.invoke('connect'),
  sendCommand: (cmd) => ipcRenderer.invoke('send-command', cmd),
  onMessage: (callback) => ipcRenderer.on('message', callback)
});
