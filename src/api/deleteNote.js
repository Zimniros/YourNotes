import fs from 'fs';
import path from 'path';

import consts from './consts';

function deleteNote(noteId) {
  const notePath = path.join(consts.NOTES_PATH, `${noteId}.json`);

  try {
    fs.unlinkSync(notePath);
  } catch (error) {
    console.warn("Can't find note json file.", error);
    Promise.reject(new Error("Can't find note json file."));
  }

  return Promise.resolve(noteId);
}

export default deleteNote;
