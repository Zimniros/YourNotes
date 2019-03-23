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

export const addFolder = folder => ({
  type: 'ADD_FOLDER',
  folder
});

export const addTag = tag => ({
  type: 'ADD_TAG',
  tag
});

export const updateFolder = folder => ({
  type: 'UPDATE_FOLDER',
  folder
});

export const updateTag = tag => ({
  type: 'UPDATE_TAG',
  tag
});

export const deleteFolder = folderId => ({
  type: 'DELETE_FOLDER',
  folderId
});

export const deleteTag = tagId => ({
  type: 'DELETE_TAG',
  tagId
});

export const addNote = location => dispatch =>
  new Promise((resolve, reject) => {
    ipcRenderer.send('note:create', location);

    ipcRenderer.on('note:created', (event, note) => {
      dispatch({
        type: 'ADD_NOTE',
        note
      });

      resolve(note);
    });

    ipcRenderer.on('note:error', (event, errorMessage) => {
      reject(new Error(errorMessage));
    });
  });

export const updateNote = note => ({
  type: 'UPDATE_NOTE',
  note
});

export const deleteNote = key => ({
  type: 'DELETE_NOTE',
  key
});

export const setSortBy = ({ sortField, sortOrder }) => ({
  type: 'SET_SORT_BY',
  sortField,
  sortOrder
});
