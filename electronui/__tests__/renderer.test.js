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
    await new Promise((r) => setTimeout(r, 50));
    const title = document.querySelector('h1');
    expect(title.textContent).toBe('LinuxCNC Electron UI');
    expect(document.querySelector('button')).not.toBeNull();
    expect(window.electronAPI.onMessage).toHaveBeenCalled();
  });

  test('renderer script ends with closing listener', () => {
    const fs = require('fs');
    const path = require('path');
    const content = fs
      .readFileSync(path.join(__dirname, '..', 'public', 'renderer.js'), 'utf8')
      .trim();
    expect(content.endsWith('});')).toBe(true);
  });

  test('index.html contains a basic CSP', () => {
    const fs = require('fs');
    const path = require('path');
    const html = fs.readFileSync(
      path.join(__dirname, '..', 'public', 'index.html'),
      'utf8'
    );
    expect(html).toMatch(
      /<meta http-equiv="Content-Security-Policy" content="script-src 'self'; object-src 'self'"\s*\/>/
    );
  });
});
