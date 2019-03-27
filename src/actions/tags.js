import { ipcRenderer } from 'electron';

export const addTag = name => dispatch =>
  new Promise((resolve, reject) => {
    ipcRenderer.send('tag:create', name);

    ipcRenderer.once('tag:created', (event, tag) => {
      dispatch({
        type: 'ADD_TAG',
        tag
      });

      resolve(tag);
    });

    ipcRenderer.once('tag:created:error', (event, errorMessage) => {
      reject(new Error(errorMessage));
    });
  });

export default {
  addTag
};
