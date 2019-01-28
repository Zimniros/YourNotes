import resolveNotes from '../../lib/resolveNotes';

const initialState = {
  notes: [],
  selectedNote: null,
};

resolveNotes().then((data) => {
  initialState.notes = data;
});

export default (state = initialState, action) => {
  switch (action.type) {
    case 'ADD_NOTE':
      return { ...state, notes: [...state.notes, action.note] };
    default:
      return state;
  }
};
