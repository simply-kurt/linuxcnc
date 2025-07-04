describe('UI render', () => {
  test('creates elements on DOMContentLoaded', () => {
    document.body.innerHTML = '<div id="root"></div>';
    window.electronAPI = { onMessage: jest.fn(), connect: jest.fn(), sendCommand: jest.fn() };
    require('../public/renderer.js');
    document.dispatchEvent(new Event('DOMContentLoaded'));
    const title = document.querySelector('h1');
    expect(title.textContent).toBe('LinuxCNC Electron UI');
    expect(document.querySelector('button')).not.toBeNull();
    expect(window.electronAPI.onMessage).toHaveBeenCalled();
  });
});
