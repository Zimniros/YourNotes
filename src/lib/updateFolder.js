import fs from 'fs';
import { isEmpty, isString, cloneDeep } from 'lodash';

import consts from './consts';
import resolveStorage from './resolveStorage';

function updateFolder(folder) {
  if (isEmpty(folder)) {
    return Promise.reject(new Error('No input found.'));
  }

  const { id, name } = folder;

  if (!isString(name)) {
    return Promise.reject(new Error('Name must be a string.'));
  }

  if (name < 1) {
    return Promise.reject(new Error('Name must be at least 1 character long.'));
  }

  return resolveStorage().then((data) => {
    if (data.some(el => el.name === name && el.id !== id)) {
      return Promise.reject(new Error(`A folder with the name '${name}' already exists.`));
    }

    const newData = cloneDeep(data);

    const targetFolder = newData.find(el => el.id === id);
    targetFolder.name = name;

    const newStorageData = Object.assign({}, { folders: newData });

    try {
      fs.writeFileSync(consts.JSON_PATH, JSON.stringify(newStorageData));
    } catch (error) {
      return Promise.reject(error);
    }

    return Promise.resolve(folder);
  });
}

export default updateFolder;
