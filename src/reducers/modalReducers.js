const initialState = {
  modalType: null,
  modalProps: {},
};

export default (state = initialState, action) => {
  switch (action.type) {
    case 'SHOW_MODAL':
      return {
        modalType: action.modalType,
        modalProps: action.modalProps,
      };
    case 'CLOSE_MODAL':
      return initialState;
    default:
      return state;
  }
};
