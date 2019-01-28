import resolveStorage from '../../lib/resolveStorage';

const folders = resolveStorage();

const initialState = {
  folders,
  selectedFolder: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case 'ADD_FOLDER':
      return { ...state, folders: [...state.folders, action.folder] };

    case 'SELECT_FOLDER':
      return { ...state, selectedFolder: state.folders.find(({ id }) => id === action.id) };

    case 'RESET_SELECTED_FOLDER':
      return { ...state, selectedFolder: null };
    default:
      return state;
  }
};
