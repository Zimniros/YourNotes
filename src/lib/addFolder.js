import v4 from 'uuid/v4';
import fs from 'fs';
import { isString } from 'lodash';

import consts from './consts';
import resolveStorage from './resolveStorage';

function addFolder(name) {
  if (!isString(name)) {
    return Promise.reject(new Error('Name must be a string.'));
  }

  if (name < 1) {
    return Promise.reject(new Error('Name must be at least 1 character long.'));
  }

  return resolveStorage().then((storageData) => {
    const { folders } = storageData;

    if (folders.some(folder => folder.name === name)) {
      return Promise.reject(new Error(`A folder with the name '${name}' already exists.`));
    }

    const newFolder = {
      id: v4(),
      name,
    };

    return Promise.resolve(newFolder).then((folder) => {
      const newFolders = [...folders, folder];
      const newStorageData = Object.assign({}, storageData, { folders: newFolders });

      fs.writeFileSync(consts.JSON_PATH, JSON.stringify(newStorageData));

      return folder;
    });
  });
}

export default addFolder;
