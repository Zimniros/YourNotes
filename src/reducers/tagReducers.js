/* eslint-disable no-case-declarations */
import Map from '../api/Map';

const initialState = new Map();

export default (state = initialState, action) => {
  switch (action.type) {
    case 'ADD_TAG':
    case 'RENAME_TAG': {
      const { tag } = action;
      const newState = new Map(state);
      newState.set(tag.id, tag);
      return newState;
    }

    case 'DELETE_TAG': {
      const { id } = action;
      const newState = new Map(state);

      newState.delete(id);

      return newState;
    }

    default:
      return state;
  }
};
