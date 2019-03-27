import { ipcRenderer } from 'electron';

export const showAddFolderModal = () => ({
  type: 'SHOW_MODAL',
  modalType: 'ADD_FOLDER'
});

export const showRenameFolderModal = folder => ({
  type: 'SHOW_MODAL',
  modalType: 'RENAME_FOLDER',
  modalProps: { folder }
});

export const showDeleteFolderConfirmationModal = folder => ({
  type: 'SHOW_MODAL',
  modalType: 'DELETE_FOLDER_CONFIRMATION',
  modalProps: { folder }
});

export const showAddTagModal = () => ({
  type: 'SHOW_MODAL',
  modalType: 'ADD_TAG'
});

export const showRenameTagModal = tag => ({
  type: 'SHOW_MODAL',
  modalType: 'RENAME_TAG',
  modalProps: { tag }
});

export const showDeleteTagConfirmationModal = tag => ({
  type: 'SHOW_MODAL',
  modalType: 'DELETE_TAG_CONFIRMATION',
  modalProps: { tag }
});

export const showDeleteNoteConfirmationModal = note => ({
  type: 'SHOW_MODAL',
  modalType: 'DELETE_NOTE_CONFIRMATION',
  modalProps: { note }
});

export const closeModal = () => ({
  type: 'CLOSE_MODAL'
});

export const addNote = location => dispatch =>
  new Promise((resolve, reject) => {
    ipcRenderer.send('note:create', location);

    ipcRenderer.once('note:created', (event, note) => {
      dispatch({
        type: 'ADD_NOTE',
        note
      });

      resolve(note);
    });

    ipcRenderer.once('note:created:error', (event, errorMessage) => {
      reject(new Error(errorMessage));
    });
  });

export const updateNote = (noteKey, input) => dispatch =>
  new Promise((resolve, reject) => {
    ipcRenderer.send('note:update', { noteKey, input });

    ipcRenderer.once('note:updated', (event, note) => {
      dispatch({
        type: 'UPDATE_NOTE',
        note
      });

      resolve(note);
    });

    ipcRenderer.once('note:updated:error', (event, errorMessage) => {
      reject(new Error(errorMessage));
    });
  });

export const deleteNote = noteKey => dispatch =>
  new Promise((resolve, reject) => {
    ipcRenderer.send('note:delete', noteKey);

    ipcRenderer.once('note:deleted', (event, deletedKey) => {
      dispatch({
        type: 'DELETE_NOTE',
        key: deletedKey
      });

      resolve(deletedKey);
    });

    ipcRenderer.once('note:deleted:error', (event, errorMessage) => {
      reject(new Error(errorMessage));
    });
  });

export const setSortBy = ({ sortField, sortOrder }) => ({
  type: 'SET_SORT_BY',
  sortField,
  sortOrder
});
