import v4 from 'uuid/v4';
import fs from 'fs';
import path from 'path';
import mkdirp from 'mkdirp';

import consts from './consts';
import resolveStorage from './resolveStorage';

import { initialEditorValue } from '../renderer/components/lib/consts';

function addNote(folderId) {
  return resolveStorage().then((folders) => {
    if (folderId && !folders.some(({ id }) => id === folderId)) {
      return Promise.reject(new Error(`A folder with the id '${folderId}' doesn't exist.`));
    }

    const newNote = {
      title: '',
      value: initialEditorValue,
      createdAt: new Date().getTime(),
      updatedAt: new Date().getTime(),
      folder: folderId || '',
      tags: [],
      isStarred: false,
      isTrashed: false,
    };

    const id = v4();
    const notePath = path.join(consts.NOTES_PATH, `${id}.json`);
    const data = JSON.stringify(Object.assign(newNote, { value: JSON.stringify(newNote.value.toJSON()) }));

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
