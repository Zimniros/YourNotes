import { combineReducers } from 'redux';

import modal from './modalReducers';

const foldersReducer = () => ['My folder', 'Not my folder', 'folder7', 'folder654'];

export default combineReducers({
  folders: foldersReducer,
  modal,
});
