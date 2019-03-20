import v4 from 'uuid/v4';
import { isString } from 'lodash';

import db from './db';

async function addFolder(name) {
  if (!isString(name)) {
    return Promise.reject(new Error('Name must be a string.'));
  }

  if (name < 1) {
    return Promise.reject(new Error('Name must be at least 1 character long.'));
  }

  const targetFolder = await db.folders.findOne({ name });

  if (targetFolder) {
    return Promise.reject(
      new Error(`A folder with the name '${name}' already exists.`)
    );
  }

  const newFolder = {
    id: v4(),
    name
  };

  await db.folders.insert(newFolder);

  return newFolder;
}

export default addFolder;
