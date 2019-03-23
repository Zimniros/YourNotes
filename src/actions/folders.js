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

export default {
  addFolder
};
