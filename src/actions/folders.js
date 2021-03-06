import { ipcRenderer } from 'electron';

export const addFolder = name => dispatch =>
  new Promise((resolve, reject) => {
    ipcRenderer.send('folder:create', name);

    ipcRenderer.once('folder:created', (event, folder) => {
      dispatch({
        type: 'ADD_FOLDER',
        folder
      });

      resolve(folder);
    });

    ipcRenderer.once('folder:created:error', (event, errorMessage) => {
      reject(new Error(errorMessage));
    });
  });

export const renameFolder = (folderId, folderName) => dispatch =>
  new Promise((resolve, reject) => {
    ipcRenderer.send('folder:rename', { folderId, folderName });

    ipcRenderer.once('folder:renamed', (event, folder) => {
      dispatch({
        type: 'RENAME_FOLDER',
        folder
      });

      resolve(folder);
    });

    ipcRenderer.once('folder:renamed:error', (event, errorMessage) => {
      reject(new Error(errorMessage));
    });
  });

export const deleteFolder = folderId => dispatch =>
  new Promise((resolve, reject) => {
    ipcRenderer.send('folder:delete', folderId);

    ipcRenderer.once('folder:deleted', (event, deletedKey) => {
      dispatch({
        type: 'DELETE_FOLDER',
        id: deletedKey
      });

      resolve(deletedKey);
    });

    ipcRenderer.once('folder:deleted:error', (event, errorMessage) => {
      reject(new Error(errorMessage));
    });
  });

export default {
  addFolder,
  renameFolder,
  deleteFolder
};
