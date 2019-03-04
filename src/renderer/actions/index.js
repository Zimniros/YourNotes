export const showAddFolderModal = () => ({
  type: 'SHOW_MODAL',
  modalType: 'ADD_FOLDER',
});

export const showDeleteFolderConfirmationModal = folder => ({
  type: 'SHOW_MODAL',
  modalType: 'DELETE_FOLDER_CONFIRMATION',
  modalProps: { folder },
});

export const showDeleteNoteConfirmationModal = note => ({
  type: 'SHOW_MODAL',
  modalType: 'DELETE_NOTE_CONFIRMATION',
  modalProps: { note },
});

export const closeModal = () => ({
  type: 'CLOSE_MODAL',
});

export const addFolder = folder => ({
  type: 'ADD_FOLDER',
  folder,
});

export const addNote = note => ({
  type: 'ADD_NOTE',
  note,
});

export const updateNote = note => ({
  type: 'UPDATE_NOTE',
  note,
});

export const deleteNote = key => ({
  type: 'DELETE_NOTE',
  key,
});
