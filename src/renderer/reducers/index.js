import { combineReducers } from 'redux';

import modal from './modalReducers';
import folders from './folderReducers';
import notes from './noteReducers';

export default combineReducers({
  folders,
  modal,
  notes,
});
