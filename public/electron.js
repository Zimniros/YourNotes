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
const deleteNote = require('./../src/api/deleteNote');

const addFolder = require('./../src/api/addFolder');
const renameFolder = require('../src/api/renameFolder');
const deleteFolder = require('./../src/api/deleteFolder');

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

/*
  Note events
*/
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

ipcMain.on('note:delete', (event, noteKey) => {
  deleteNote(noteKey)
    .then(deletedKey => {
      mainWindow.webContents.send('note:deleted', deletedKey);
    })
    .catch(error => {
      const errorMessage = error.message;
      mainWindow.webContents.send('note:deleted:error', errorMessage);
    });
});

/*
  Folder events
*/
ipcMain.on('folder:create', (event, name) => {
  addFolder(name)
    .then(folder => {
      mainWindow.webContents.send('folder:created', folder);
    })
    .catch(error => {
      const errorMessage = error.message;
      mainWindow.webContents.send('folder:created:error', errorMessage);
    });
});

ipcMain.on('folder:rename', (event, { folderId, folderName }) => {
  renameFolder(folderId, folderName)
    .then(folder => {
      mainWindow.webContents.send('folder:renamed', folder);
    })
    .catch(error => {
      const errorMessage = error.message;
      mainWindow.webContents.send('folder:renamed:error', errorMessage);
    });
});

ipcMain.on('folder:delete', (event, folderId) => {
  deleteFolder(folderId)
    .then(deletedKey => {
      mainWindow.webContents.send('folder:deleted', deletedKey);
    })
    .catch(error => {
      const errorMessage = error.message;
      mainWindow.webContents.send('folder:deleted:error', errorMessage);
    });
});
