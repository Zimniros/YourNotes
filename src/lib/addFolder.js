import v4 from 'uuid/v4';
import fs from 'fs';
import { isString, isEmpty } from 'lodash';

import consts from './consts';
import resolveStorage from './resolveStorage';

function addFolder(name) {
  if (!isString(name)) {
    return Promise.reject(new Error('Name must be a string.'));
  }

  if (name < 1) {
    return Promise.reject(new Error('Name must be at least 1 character long.'));
  }

  const newFolder = {
    id: v4(),
    name,
  };

  return Promise.resolve(newFolder).then((folder) => {
    const storageData = resolveStorage();
    const folders = isEmpty(storageData) ? [folder] : [...storageData, folder];
    const newStorageData = Object.assign({}, { folders });

    fs.writeFileSync(consts.JSON_PATH, JSON.stringify(newStorageData));

    return folder;
  });
}

export default addFolder;
