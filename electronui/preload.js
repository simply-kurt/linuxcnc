const { contextBridge, ipcRenderer } = require('electron');

let React;
let ReactDOM;
try {
  React = require('react');
  ReactDOM = require('react-dom/client');
} catch (err) {
  console.error('React dependencies not found. Run "npm install" in electronui/');
  throw err;
}

contextBridge.exposeInMainWorld('electronAPI', {
  connect: () => ipcRenderer.invoke('connect'),
  sendCommand: (cmd) => ipcRenderer.invoke('send-command', cmd),
  onMessage: (callback) => ipcRenderer.on('message', callback)
});

contextBridge.exposeInMainWorld('React', React);
contextBridge.exposeInMainWorld('ReactDOM', ReactDOM);
