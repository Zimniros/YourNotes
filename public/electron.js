const electron = require('electron');

const { app, BrowserWindow, ipcMain } = electron;

const path = require('path');
const isDev = require('electron-is-dev');

let mainWindow;

if (process.platform === 'win32') {
  app.commandLine.appendSwitch('high-dpi-support', 'true');
  app.commandLine.appendSwitch('force-device-scale-factor', '1');
}

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1024,
    height: 768,
    minWidth: 1024,
    minHeight: 768,
    show: false
  });

  mainWindow.loadURL(
    isDev
      ? 'http://localhost:3000'
      : `file://${path.join(__dirname, '../build/index.html')}`
  );

  mainWindow.once('ready-to-show', () => {
    mainWindow.show();
    // if (isDev) {
    mainWindow.webContents.openDevTools();
    // }
  });

  mainWindow.on('closed', () => {
    mainWindow = null;
  });
}

app.on('ready', createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (mainWindow === null) {
    createWindow();
  }
});

const db = require('./../src/api/db');
const addNote = require('./../src/api/addNote');
const updateNote = require('./../src/api/updateNote');

ipcMain.on('init:start', () => {
  Promise.all([db.notes.find({}), db.folders.find({}), db.tags.find({})]).then(
    results => {
      const data = {
        notes: results[0],
        folders: results[1],
        tags: results[2]
      };

      mainWindow.webContents.send('init:finish', data);
    }
  );
});

ipcMain.on('note:create', (event, location) => {
  addNote(location)
    .then(note => {
      mainWindow.webContents.send('note:created', note);
    })
    .catch(error => {
      const errorMessage = error.message;
      mainWindow.webContents.send('note:created:error', errorMessage);
    });
});

ipcMain.on('note:update', (event, { noteKey, input }) => {
  updateNote(noteKey, input)
    .then(note => {
      mainWindow.webContents.send('note:updated', note);
    })
    .catch(error => {
      const errorMessage = error.message;
      mainWindow.webContents.send('note:updated:error', errorMessage);
    });
});
