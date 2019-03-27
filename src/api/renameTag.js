const { isString } = require('lodash');

const db = require('./db');

async function renameTag(tagId, tagName) {
  if (!isString(tagId)) {
    return Promise.reject(new Error('Tag id must be a string.'));
  }

  if (!isString(tagName)) {
    return Promise.reject(new Error('Tag name must be a string.'));
  }

  if (tagName.length < 1) {
    return Promise.reject(new Error('Name must be at least 1 character long.'));
  }

  try {
    const targetTag = await db.tags.findOne({ id: tagId });

    if (targetTag == null) {
      return Promise.reject(
        new Error(`A tag with the id '${tagId}' doesn't exist.`)
      );
    }
  } catch (error) {
    return Promise.reject(error);
  }

  try {
    const tagWithName = await db.tags.findOne({ name: tagName });

    if (tagWithName != null) {
      return Promise.reject(
        new Error(`A tag with the name '${tagName}' already exists.`)
      );
    }
  } catch (error) {
    return Promise.reject(error);
  }

  const tag = {
    id: tagId,
    name: tagName
  };

  try {
    await db.tags.update({ id: tagId }, tag);
  } catch (error) {
    return Promise.reject(error);
  }

  return Promise.resolve(tag);
}

module.exports = renameTag;
