const { app, BrowserWindow } = require('electron');
const path = require('path');

function createWindow() {
  const win = new BrowserWindow({
    width: 900,
    height: 700,
    webPreferences: {
      preload: path.join(__dirname, '../preload/preload.js')
    }
  });

  // DEV MODE: load Vite dev server
  if (!app.isPackaged) {
    win.loadURL('http://localhost:5173');
  } else {
    // PROD MODE: load built renderer
    win.loadFile(path.join(__dirname, '../renderer/index.html'));
  }
}

app.whenReady().then(createWindow);
