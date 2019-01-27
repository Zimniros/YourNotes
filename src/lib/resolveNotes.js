/* eslint-disable consistent-return */
/* eslint-disable array-callback-return */
import fs from 'fs';
import path from 'path';
import mkdirp from 'mkdirp';
import consts from './consts';

function resolveNotes() {
  const notesFolderPath = consts.NOTES_PATH;
  let noteList;

  try {
    noteList = fs.readdirSync(notesFolderPath);
  } catch (err) {
    if (err.code === 'ENOENT') {
      mkdirp(notesFolderPath);
    } else {
      console.warn('Error in resolveNotes:', err);
    }

    noteList = [];
  }

  const notes = noteList
    .filter(notePath => /\.json$/.test(notePath))
    .map((notePath) => {
      try {
        const data = JSON.parse(fs.readFileSync(path.join(notesFolderPath, notePath)));
        data.key = path.basename(notePath, '.json');
        return data;
      } catch (err) {
        console.error(`error on note path: ${notePath}, error: ${err}`);
      }
    })
    .filter(noteObj => typeof noteObj === 'object');

  return Promise.resolve(notes);
}

export default resolveNotes;
