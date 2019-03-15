const initialState = {
  sortField: 'UPDATED_AT',
  sortOrder: 'DESC',
};

export default (state = initialState, action) => {
  switch (action.type) {
    case 'SET_SORT_BY':
      return {
        sortField: action.sortField,
        sortOrder: action.sortOrder,
      };

    default:
      return state;
  }
};
