import { combineReducers } from 'redux';

import modal from './modalReducers';
import folders from './folderReducers';
import notesData from './noteReducers';
import tags from './tagReducers';

export default combineReducers({
  folders,
  modal,
  notesData,
  tags,
});
