const db = require('./db');

async function deleteFolder(folderId) {
  if (folderId == null) {
    return Promise.reject(new Error('FolderId is not provided.'));
  }

  try {
    await db.folders.remove({ id: folderId });
  } catch (error) {
    return Promise.reject(error);
  }

  return Promise.resolve(folderId);
}

module.exports = deleteFolder;
