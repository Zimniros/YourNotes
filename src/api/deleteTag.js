import fs from 'fs';
import remove from 'lodash/remove';

import consts from './consts';
import resolveStorage from './resolveStorage';

function deleteFolder(tagId) {
  if (!tagId) {
    return Promise.reject(new Error('TagId is not provided.'));
  }

  return resolveStorage().then((storageData) => {
    const { tags } = storageData;
    const targetTag = tags.find(tag => tag.id === tagId);

    if (!targetTag) {
      return Promise.reject(new Error(`A tag with the id '${targetTag}' does not found.`));
    }

    remove(tags, tag => tag.id === tagId);

    const newStorageData = Object.assign({}, storageData, { tags });

    try {
      fs.writeFileSync(consts.JSON_PATH, JSON.stringify(newStorageData));
    } catch (error) {
      return Promise.reject(error);
    }

    return Promise.resolve(tagId);
  });
}

export default deleteFolder;
