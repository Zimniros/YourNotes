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

export const addNote = note => ({
  type: 'ADD_NOTE',
  note,
});

export const setLocationName = locationName => ({
  type: 'SET_LOCATION_NAME',
  locationName,
});
