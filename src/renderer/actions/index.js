export const showAddFolderModal = () => ({
  type: 'SHOW_MODAL',
  modalType: 'ADD_FOLDER',
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
