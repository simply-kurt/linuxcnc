jest.mock('react-dom/client', () => {
  return {
    createRoot: jest.fn(() => ({ render: jest.fn() }))
  };
});

describe('App render', () => {
  test('creates root and renders', () => {
    document.body.innerHTML = '<div id="root"></div>';
    window.electronAPI = {
      onMessage: jest.fn(),
      connect: jest.fn(),
      sendCommand: jest.fn(),
    };
    jest.resetModules();
    const { createRoot } = require('react-dom/client');
    require('../src/index.js');
    expect(createRoot).toHaveBeenCalledTimes(1);
  });
});
