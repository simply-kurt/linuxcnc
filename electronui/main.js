const { app, BrowserWindow, ipcMain } = require('electron');
const net = require('net');
const path = require('path');

let win = null;
let client = null;

function createWindow() {
  win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: true,
      preload: path.join(__dirname, 'preload.js')
    }
  });

  win.loadFile(path.join(__dirname, 'public', 'index.html'));
}

app.whenReady().then(() => {
  createWindow();

  app.on('activate', function () {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') app.quit();
});

ipcMain.handle('connect', async () => {
  if (client) return;
  client = net.createConnection({ host: 'localhost', port: 5007 });
  client.on('data', (data) => {
    win.webContents.send('message', data.toString());
  });
});

ipcMain.handle('send-command', async (event, cmd) => {
  if (client) {
    client.write(cmd + '\n');
  }
});

