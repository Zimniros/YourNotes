const db = require('./db');

async function deleteNote(noteKey) {
  if (noteKey == null) {
    return Promise.reject(new Error('No note key was provided.'));
  }

  try {
    await db.notes.remove({ key: noteKey });
  } catch (error) {
    return Promise.reject(error);
  }

  return Promise.resolve(noteKey);
}

module.exports = deleteNote;
