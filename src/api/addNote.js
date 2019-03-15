import v4 from 'uuid/v4';
import fs from 'fs';
import path from 'path';
import mkdirp from 'mkdirp';

import consts from './consts';
import resolveStorage from './resolveStorage';

function addNote(type, locationId) {
  return resolveStorage().then((storageData) => {
    const { folders, tags } = storageData;

    if (type && locationId) {
      if (type === 'folder') {
        if (!folders.some(({ id }) => id === locationId)) {
          return Promise.reject(new Error(`A folder with the id '${locationId}' doesn't exist.`));
        }
      }

      if (type === 'tag') {
        if (!tags.some(({ id }) => id === locationId)) {
          return Promise.reject(new Error(`A tag with the id '${locationId}' doesn't exist.`));
        }
      }
    }

    const newNote = {
      title: '',
      value: '<p><br></p>',
      createdAt: new Date().getTime(),
      updatedAt: new Date().getTime(),
      folder: '',
      tags: [],
      isStarred: false,
      isTrashed: false,
    };

    if (type === 'folder') {
      newNote.folder = locationId;
    }

    if (type === 'tag') {
      newNote.tags.push(locationId);
    }

    const id = v4();
    const notePath = path.join(consts.NOTES_PATH, `${id}.json`);
    const data = JSON.stringify(Object.assign({}, newNote));

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
