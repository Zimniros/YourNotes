import { combineReducers } from 'redux';

import modal from './modalReducers';
import folders from './folderReducers';
import notesData from './noteReducers';
import tags from './tagReducers';
import sortBy from './sortByReducers';

export default combineReducers({
  folders,
  modal,
  notesData,
  tags,
  sortBy,
});
