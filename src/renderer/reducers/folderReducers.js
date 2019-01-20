export default (state = [], action) => {
  switch (action.type) {
    case 'ADD_FOLDER':
      return [...state, action.folder];
    default:
      return state;
  }
};
