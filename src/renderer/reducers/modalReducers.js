const initialState = {
  isOpen: false,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case 'SHOW_MODAL':
      return {
        isOpen: true,
      };
    case 'CLOSE_MODAL':
      return initialState;
    default:
      return state;
  }
};
