/* eslint-disable no-case-declarations */
import { isEmpty } from 'lodash';
import Map from '../../lib/Map';
import Set from '../../lib/Set';

const initialState = {
  allNotes: new Map(),
  starredNotes: new Set(),
  trashedNotes: new Set(),
};

export default (state = initialState, action) => {
  switch (action.type) {
    case 'ADD_NOTE': {
      const { note } = action;

      const allNotes = new Map(state.allNotes);
      const starredNotes = new Set(state.starredNotes);
      const trashedNotes = new Set(state.trashedNotes);
      const newState = Object.assign({}, { allNotes, starredNotes, trashedNotes });

      newState.allNotes.set(note.key, note);
      return newState;
    }

    case 'UPDATE_NOTE': {
      const { note } = action;
      const oldNote = state.allNotes.get(note.key);

      const allNotes = new Map(state.allNotes);
      const starredNotes = new Set(state.starredNotes);
      const trashedNotes = new Set(state.trashedNotes);
      const newState = Object.assign({}, { allNotes, starredNotes, trashedNotes });

      newState.allNotes.set(note.key, note);

      if (isEmpty(oldNote) || oldNote.isStarred !== note.isStarred) {
        if (note.isStarred) {
          newState.starredNotes.add(note.key);
        } else {
          newState.starredNotes.delete(note.key);
        }
      }

      if (isEmpty(oldNote) || oldNote.isTrashed !== note.isTrashed) {
        if (note.isTrashed) {
          newState.trashedNotes.add(note.key);

          if (note.isStarred) {
            newState.starredNotes.delete(note.key);
          }
        } else {
          newState.trashedNotes.delete(note.key);
        }
      }

      return newState;
    }

    default:
      return state;
  }
};
