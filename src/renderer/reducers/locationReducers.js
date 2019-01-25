export default (state = '', action) => {
  switch (action.type) {
    case 'SET_LOCATION_NAME':
      return action.locationName;
    default:
      return state;
  }
};
