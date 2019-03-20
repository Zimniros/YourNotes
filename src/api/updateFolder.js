import { isEmpty, isString } from 'lodash';

import db from './db';

async function updateFolder(folder) {
  if (isEmpty(folder)) {
    return Promise.reject(new Error('No input found.'));
  }

  const { id, name } = folder;

  if (!isString(name)) {
    return Promise.reject(new Error('Name must be a string.'));
  }

  if (name < 1) {
    return Promise.reject(new Error('Name must be at least 1 character long.'));
  }

  const folderWithName = await db.folders.findOne({ name });

  if (folderWithName) {
    return Promise.reject(
      new Error(`A folder with the name '${name}' already exists.`)
    );
  }

  await db.folders.update({ id }, folder);

  return Promise.resolve(folder);
}

export default updateFolder;
