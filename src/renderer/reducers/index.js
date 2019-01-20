import { combineReducers } from 'redux';

import modal from './modalReducers';
import folders from './folderReducers';

export default combineReducers({
  folders,
  modal,
});
