/* eslint-disable no-case-declarations */
import Map from '../../lib/Map';

const initialState = new Map();

export default (state = initialState, action) => {
  switch (action.type) {
    case 'ADD_FOLDER':
      const { folder } = action;
      const newState = new Map(state);
      newState.set(folder.key, folder);
      return newState;

    default:
      return state;
  }
};
