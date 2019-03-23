const v4 = require('uuid/v4');
const { isString } = require('lodash');

const db = require('./db');

async function addFolder(name) {
  if (!isString(name)) {
    return Promise.reject(new Error('Name must be a string.'));
  }

  if (name.length < 1) {
    return Promise.reject(new Error('Name must be at least 1 character long.'));
  }

  let targetFolder;

  try {
    targetFolder = await db.folders.findOne({ name });
  } catch (error) {
    return Promise.reject(error);
  }

  if (targetFolder) {
    return Promise.reject(
      new Error(`A folder with the name '${name}' already exists.`)
    );
  }

  const newFolder = {
    id: v4(),
    name
  };

  try {
    await db.folders.insert(newFolder);
  } catch (error) {
    return Promise.reject(error);
  }

  return newFolder;
}

module.exports = addFolder;
