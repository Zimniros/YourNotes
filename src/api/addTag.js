import v4 from 'uuid/v4';
import fs from 'fs';
import { isString } from 'lodash';

import consts from './consts';
import resolveStorage from './resolveStorage';

function addTag(name) {
  if (!isString(name)) {
    return Promise.reject(new Error('Name must be a string.'));
  }

  if (name < 1) {
    return Promise.reject(new Error('Name must be at least 1 character long.'));
  }

  return resolveStorage().then((storageData) => {
    const { tags } = storageData;

    if (tags.some(tag => tag.name === name)) {
      return Promise.reject(new Error(`A tag with the name '${name}' already exists.`));
    }

    const newTag = {
      id: v4(),
      name,
    };

    return Promise.resolve(newTag).then((tag) => {
      const newTags = [...tags, tag];
      const newStorageData = Object.assign({}, storageData, { tags: newTags });

      fs.writeFileSync(consts.JSON_PATH, JSON.stringify(newStorageData));

      return tag;
    });
  });
}

export default addTag;
