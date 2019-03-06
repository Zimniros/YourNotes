import fs from 'fs';

import consts from './consts';

function resolveStorage() {
  return new Promise((resolve, reject) => {
    let storageData;

    try {
      storageData = JSON.parse(fs.readFileSync(consts.JSON_PATH));
    } catch (err) {
      if (err.code === 'ENOENT') {
        fs.writeFileSync(consts.JSON_PATH, JSON.stringify({ folders: [], tags: [] }));
      } else {
        console.error(err);
        return reject(err);
      }

      storageData = { folders: [], tags: [] };
    }

    return resolve(storageData);
  });
}

export default resolveStorage;
