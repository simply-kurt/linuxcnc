jest.mock('electron');

let electron;

describe('preload script', () => {
  beforeEach(() => {
    jest.resetModules();
    jest.clearAllMocks();
    electron = require('electron');
  });

  test('exposes React globals when dependencies exist', () => {
    jest.isolateModules(() => {
      require('../preload.js');
    });
    const calls = electron.contextBridge.exposeInMainWorld.mock.calls.map(c => c[0]);
    expect(calls).toEqual(expect.arrayContaining(['electronAPI', 'React', 'ReactDOM']));
  });
});
