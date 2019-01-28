import fs from 'fs';

import consts from './consts';

function resolveStorage() {
  return new Promise((resolve, reject) => {
    let storageData;

    try {
      const jsonData = JSON.parse(fs.readFileSync(consts.JSON_PATH));
      storageData = jsonData.folders;
    } catch (err) {
      if (err.code === 'ENOENT') {
        fs.writeFileSync(consts.JSON_PATH, JSON.stringify({ folders: [] }));
      } else {
        console.error(err);
        return reject(err);
      }

      storageData = [];
    }

    return resolve(storageData);
  });
}

export default resolveStorage;
