import v4 from 'uuid/v4';
import fs from 'fs';
import path from 'path';
import mkdirp from 'mkdirp';

import consts from './consts';
import resolveStorage from './resolveStorage';

function addNote(folderId) {
  return resolveStorage().then((folders) => {
    if (folderId && !folders.some(({ id }) => id === folderId)) {
      return Promise.reject(new Error(`A folder with the id '${folderId}' doesn't exist.`));
    }

    const newNote = {
      title: '',
      content: '',
      createdAt: new Date(),
      updatedAt: new Date(),
      folder: folderId || '',
      tags: [],
      isStarred: false,
      isTrashed: false,
    };

    const id = v4();
    const notePath = path.join(consts.NOTES_PATH, `${id}.json`);
    const data = JSON.stringify(newNote);

    return new Promise((resolve, reject) => {
      mkdirp(consts.NOTES_PATH, (err) => {
        if (err) return reject(err);

        fs.writeFileSync(notePath, data);
        newNote.key = id;
        return resolve(newNote);
      });
    });
  });
}

export default addNote;
