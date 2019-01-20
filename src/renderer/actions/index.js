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
