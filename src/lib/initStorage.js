import fs from 'fs';
import path from 'path';

import consts from './consts';

function initStorage() {
  const JSONPath = path.join(consts.STORAGE_PATH, 'yournotes.json');
  const storage = {};

  try {
    const jsonData = JSON.parse(fs.readFileSync(JSONPath));
    storage.folders = jsonData.folders;
    storage.version = jsonData.version;
  } catch (err) {
    if (err.code === 'ENOENT') {
      fs.writeFileSync(JSONPath, JSON.stringify({ folders: [], version: '0.0.3' }));
    } else {
      console.error(err);
    }

    storage.folders = [];
    storage.version = '1.0';
  }

  return storage;
}

export default initStorage;
