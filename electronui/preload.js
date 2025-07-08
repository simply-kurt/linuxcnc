const { contextBridge, ipcRenderer } = require('electron');
const React = require('react');
const ReactDOM = require('react-dom/client');

contextBridge.exposeInMainWorld('electronAPI', {
  connect: () => ipcRenderer.invoke('connect'),
  sendCommand: (cmd) => ipcRenderer.invoke('send-command', cmd),
  onMessage: (callback) => ipcRenderer.on('message', callback)
});

contextBridge.exposeInMainWorld('React', React);
contextBridge.exposeInMainWorld('ReactDOM', ReactDOM);
