import { combineReducers } from 'redux';

import modal from './modalReducers';
import folders from './folderReducers';
import notesData from './noteReducers';

export default combineReducers({
  folders,
  modal,
  notesData,
});
