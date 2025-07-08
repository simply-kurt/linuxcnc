describe('UI render', () => {
  test('creates elements on DOMContentLoaded', async () => {
    document.body.innerHTML = '<div id="root"></div>';
    window.React = require('react');
    window.ReactDOM = require('react-dom/client');
    window.electronAPI = {
      onMessage: jest.fn((cb) => cb(null, 'hello')),
      connect: jest.fn(),
      sendCommand: jest.fn()
    };
    require('../public/renderer.js');
    document.dispatchEvent(new Event('DOMContentLoaded'));
    await new Promise((r) => setTimeout(r, 20));
    const title = document.querySelector('h1');
    expect(title.textContent).toBe('LinuxCNC Electron UI');
    expect(document.querySelector('button')).not.toBeNull();
    expect(window.electronAPI.onMessage).toHaveBeenCalled();
  });
});
