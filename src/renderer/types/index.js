import {
  instanceOf, shape, string, arrayOf, bool, number, oneOf, oneOfType, object, func, array,
} from 'prop-types';
import Map from '../../lib/Map';

import Set from '../../lib/Set';

export const folderType = shape({
  id: string.isRequired,
  name: string.isRequired,
});

export const folderDefault = {
  id: '',
  name: '',
};

export const noteType = shape({
  key: string.isRequired,
  title: string.isRequired,
  value: string.isRequired,
  createdAt: number.isRequired,
  updatedAt: number.isRequired,
  folder: string.isRequired,
  tags: arrayOf(string).isRequired,
  isStarred: bool.isRequired,
  isTrashed: bool.isRequired,
});

export const noteDefault = {
  key: '',
  title: '',
  value: {},
  createdAt: new Date().getTime(),
  updatedAt: new Date().getTime(),
  folder: '',
  tags: [],
  isStarred: false,
  isTrashed: false,
};

export const notesDataType = shape({
  allNotes: instanceOf(Map).isRequired,
  starredNotes: instanceOf(Set).isRequired,
  trashedNotes: instanceOf(Set).isRequired,
});

export const locationType = shape({
  hash: string.isRequired,
  key: string, // only in createBrowserHistory and createMemoryHistory
  pathname: string.isRequired,
  search: string.isRequired,
  state: oneOfType([array, bool, number, object, string]), // only in createBrowserHistory and createMemoryHistory
});

export const historyType = shape({
  action: oneOf(['PUSH', 'REPLACE', 'POP']).isRequired,
  block: func.isRequired,
  canGo: func, // only in createMemoryHistory
  createHref: func.isRequired,
  entries: arrayOf(locationType), // only in createMemoryHistory
  go: func.isRequired,
  goBack: func.isRequired,
  goForward: func.isRequired,
  index: number, // only in createMemoryHistory
  length: number,
  listen: func.isRequired,
  location: locationType.isRequired,
  push: func.isRequired,
  replace: func.isRequired,
});

export default {
  folderType,
  folderDefault,
  noteType,
  noteDefault,
  notesDataType,
  locationType,
  historyType,
};
