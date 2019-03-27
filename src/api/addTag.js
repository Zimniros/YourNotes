const v4 = require('uuid/v4');
const { isString } = require('lodash');

const db = require('./db');

async function addTag(name) {
  if (!isString(name)) {
    return Promise.reject(new Error('Name must be a string.'));
  }

  if (name.length < 1) {
    return Promise.reject(new Error('Name must be at least 1 character long.'));
  }

  let targetTag;

  try {
    targetTag = await db.tags.findOne({ name });
  } catch (error) {
    return Promise.reject(error);
  }

  if (targetTag) {
    return Promise.reject(
      new Error(`A tag with the name '${name}' already exists.`)
    );
  }

  const newTag = {
    id: v4(),
    name
  };

  try {
    await db.tags.insert(newTag);
  } catch (error) {
    return Promise.reject(error);
  }

  return Promise.resolve(newTag);
}

module.exports = addTag;
