const db = require('./db');

async function deleteTag(tagId) {
  if (tagId == null) {
    return Promise.reject(new Error('TagId is not provided.'));
  }

  try {
    await db.tags.remove({ id: tagId });
  } catch (error) {
    return Promise.reject(error);
  }

  return Promise.resolve(tagId);
}

module.exports = deleteTag;
