import db from './db';

async function deleteTag(tagId) {
  if (!tagId) {
    return Promise.reject(new Error('TagId is not provided.'));
  }

  try {
    await db.tags.remove({ id: tagId });
  } catch (error) {
    return Promise.reject(error);
  }

  return Promise.resolve(tagId);
}

export default deleteTag;
