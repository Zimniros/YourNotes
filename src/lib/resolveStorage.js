import fs from 'fs';

import consts from './consts';

function resolveStorage() {
  const storage = {};

  try {
    const jsonData = JSON.parse(fs.readFileSync(consts.JSON_PATH));
    storage.folders = jsonData.folders;
    storage.version = jsonData.version;
  } catch (err) {
    if (err.code === 'ENOENT') {
      fs.writeFileSync(consts.JSON_PATH, JSON.stringify({ folders: [] }));
    } else {
      console.error(err);
    }

    storage.folders = [];
  }

  return storage.folders;
}

export default resolveStorage;
