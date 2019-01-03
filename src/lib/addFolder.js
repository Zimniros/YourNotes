import v4 from 'uuid/v4';
import fs from 'fs';
import { isString } from 'lodash';

import consts from './consts';
import resolveStorage from './resolveStorage';

function addFolder(name) {
  let storageData;
  try {
    if (!isString(name)) throw new Error('Name must be a string.');
    storageData = resolveStorage();
  } catch (err) {
    console.error(err);
  }

  const newFolder = {
    key: v4(),
    name,
  };

  storageData.folders.push(newFolder);

  fs.writeFileSync(consts.JSON_PATH, JSON.stringify(storageData));

  return storageData;
}

export default addFolder;
