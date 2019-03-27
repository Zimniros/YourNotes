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

export const renameTag = (tagId, tagName) => dispatch =>
  new Promise((resolve, reject) => {
    ipcRenderer.send('tag:rename', { tagId, tagName });

    ipcRenderer.once('tag:renamed', (event, tag) => {
      dispatch({
        type: 'RENAME_TAG',
        tag
      });

      resolve(tag);
    });

    ipcRenderer.once('tag:renamed:error', (event, errorMessage) => {
      reject(new Error(errorMessage));
    });
  });

export default {
  addTag,
  renameTag
};
