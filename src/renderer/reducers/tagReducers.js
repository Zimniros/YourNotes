/* eslint-disable no-case-declarations */
import Map from '../../lib/Map';

const initialState = new Map();

export default (state = initialState, action) => {
  switch (action.type) {
    case 'ADD_TAG': {
      const { tag } = action;
      const newState = new Map(state);
      newState.set(tag.id, tag);
      return newState;
    }

    default:
      return state;
  }
};
