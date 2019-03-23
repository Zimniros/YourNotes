const { isString } = require('lodash');

const db = require('./db');

async function renameFolder(folderId, folderName) {
  if (!isString(folderId)) {
    return Promise.reject(new Error('Folder id must be a string.'));
  }

  if (!isString(folderName)) {
    return Promise.reject(new Error('Folder name must be a string.'));
  }

  if (folderName.length < 1) {
    return Promise.reject(new Error('Name must be at least 1 character long.'));
  }

  try {
    const targetFolder = await db.folders.findOne({ id: folderId });

    if (targetFolder == null) {
      return Promise.reject(
        new Error(`A folder with the id '${folderId}' doesn't exist.`)
      );
    }
  } catch (error) {
    return Promise.reject(error);
  }

  try {
    const folderWithName = await db.folders.findOne({ name: folderName });

    if (folderWithName != null) {
      return Promise.reject(
        new Error(`A folder with the name '${folderName}' already exists.`)
      );
    }
  } catch (error) {
    return Promise.reject(error);
  }

  const folder = {
    id: folderId,
    name: folderName
  };

  try {
    await db.folders.update({ id: folderId }, folder);
  } catch (error) {
    return Promise.reject(error);
  }

  return Promise.resolve(folder);
}

module.exports = renameFolder;
