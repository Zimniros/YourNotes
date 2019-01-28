export const showModal = () => ({
  type: 'SHOW_MODAL',
});

export const closeModal = () => ({
  type: 'CLOSE_MODAL',
});

export const addFolder = folder => ({
  type: 'ADD_FOLDER',
  folder,
});

export const selectFolder = id => ({
  type: 'SELECT_FOLDER',
  id,
});

export const resetSelectedFolder = () => ({
  type: 'RESET_SELECTED_FOLDER',
});

export const addNote = note => ({
  type: 'ADD_NOTE',
  note,
});
