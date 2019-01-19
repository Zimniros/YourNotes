import v4 from 'uuid/v4';
import fs from 'fs';
import { isString } from 'lodash';

import consts from './consts';
import resolveStorage from './resolveStorage';

function addFolder(name) {
  if (!isString(name)) {
    return Promise.reject(new Error('Name must be a string.'));
  }

  const newFolder = {
    key: v4(),
    name,
  };

  return Promise.resolve(newFolder).then((folder) => {
    const storageData = resolveStorage();
    const newStorageData = Object.assign({}, storageData, { folders: [...storageData.folders, folder] });

    fs.writeFileSync(consts.JSON_PATH, JSON.stringify(newStorageData));

    return folder;
  });
}

export default addFolder;
