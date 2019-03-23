/* eslint-disable no-case-declarations */
import Map from '../api/Map';

const initialState = new Map();

export default (state = initialState, action) => {
  switch (action.type) {
    case 'ADD_FOLDER':
    case 'RENAME_FOLDER': {
      const { folder } = action;
      const newState = new Map(state);
      newState.set(folder.id, folder);
      return newState;
    }

    case 'DELETE_FOLDER': {
      const { id } = action;
      const newState = new Map(state);

      newState.delete(id);

      return newState;
    }

    default:
      return state;
  }
};
