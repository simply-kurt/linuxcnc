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

  test('throws helpful message when React is missing', () => {
    jest.doMock('react', () => {
      throw new Error('module not found');
    });
    jest.doMock('react-dom/client', () => {
      throw new Error('module not found');
    });
    const consoleError = jest.spyOn(console, 'error').mockImplementation(() => {});
    expect(() => {
      jest.isolateModules(() => {
        require('../preload.js');
      });
    }).toThrow();
    expect(consoleError).toHaveBeenCalledWith(
      'React dependencies not found. Run "npm install" in electronui/'
    );
    consoleError.mockRestore();
  });
});
