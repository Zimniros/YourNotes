import fs from 'fs';
import { isEmpty, isString, cloneDeep } from 'lodash';

import consts from './consts';
import resolveStorage from './resolveStorage';

function updateTag(tag) {
  if (isEmpty(tag)) {
    return Promise.reject(new Error('No input found.'));
  }

  const { id, name } = tag;

  if (!isString(name)) {
    return Promise.reject(new Error('Name must be a string.'));
  }

  if (name < 1) {
    return Promise.reject(new Error('Name must be at least 1 character long.'));
  }

  return resolveStorage().then((storageData) => {
    const { tags } = storageData;

    if (tags.some(el => el.name === name && el.id !== id)) {
      return Promise.reject(new Error(`A folder with the name '${name}' already exists.`));
    }

    const newTagData = cloneDeep(tags);

    const targetTag = newTagData.find(el => el.id === id);

    targetTag.name = name;

    const newStorageData = Object.assign({}, storageData, { tags: newTagData });

    try {
      fs.writeFileSync(consts.JSON_PATH, JSON.stringify(newStorageData));
    } catch (error) {
      return Promise.reject(error);
    }

    return Promise.resolve(tag);
  });
}

export default updateTag;
