import resolveStorage from '../../lib/resolveStorage';

export default (state = [], action) => {
  let folders;
  switch (action.type) {
    case 'GET_FOLDERS':
      folders = resolveStorage();
      return folders;
    default:
      return state;
  }
};
