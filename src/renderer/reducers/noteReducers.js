/* eslint-disable no-case-declarations */
import Map from '../../lib/Map';

const initialState = new Map();

export default (state = initialState, action) => {
  switch (action.type) {
    case 'ADD_NOTE':
      const { note } = action;
      const newState = new Map(state);
      newState.set(note.key, note);
      return newState;
    default:
      return state;
  }
};
