module.exports = {
  contextBridge: {
    exposeInMainWorld: jest.fn()
  },
  ipcRenderer: {
    invoke: jest.fn(),
    on: jest.fn()
  }
};
