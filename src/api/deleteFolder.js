import fs from 'fs';
import remove from 'lodash/remove';

import consts from './consts';
import resolveStorage from './resolveStorage';

function deleteFolder(folderId) {
  if (!folderId) {
    return Promise.reject(new Error('FolderId is not provided.'));
  }

  return resolveStorage().then((storageData) => {
    const { folders } = storageData;
    const targetFolder = folders.find(folder => folder.id === folderId);

    if (!targetFolder) {
      return Promise.reject(new Error(`A folder with the id '${folderId}' does not found.`));
    }

    remove(folders, folder => folder.id === folderId);

    const newStorageData = Object.assign({}, storageData, { folders });

    try {
      fs.writeFileSync(consts.JSON_PATH, JSON.stringify(newStorageData));
    } catch (error) {
      return Promise.reject(error);
    }

    return Promise.resolve(folderId);
  });
}

export default deleteFolder;
