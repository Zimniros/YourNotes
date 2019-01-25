import { combineReducers } from 'redux';

import modal from './modalReducers';
import folders from './folderReducers';
import locationName from './locationReducers';

export default combineReducers({
  folders,
  modal,
  locationName,
});
