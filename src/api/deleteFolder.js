import db from './db';

async function deleteFolder(folderId) {
  if (!folderId) {
    return Promise.reject(new Error('FolderId is not provided.'));
  }

  try {
    await db.folders.remove({ id: folderId });
  } catch (error) {
    return Promise.reject(error);
  }

  return Promise.resolve(folderId);
}

export default deleteFolder;
