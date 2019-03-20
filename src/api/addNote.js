import v4 from 'uuid/v4';
import db from './db';

function addNote(type, locationId) {
  const { notes } = db;
  // const { folders, tags } = storageData;

  // if (type && locationId) {
  //   if (type === 'folder') {
  //     if (!folders.some(({ id }) => id === locationId)) {
  //       return Promise.reject(new Error(`A folder with the id '${locationId}' doesn't exist.`));
  //     }
  //   }

  //   if (type === 'tag') {
  //     if (!tags.some(({ id }) => id === locationId)) {
  //       return Promise.reject(new Error(`A tag with the id '${locationId}' doesn't exist.`));
  //     }
  //   }
  // }

  const newNote = {
    key: v4(),
    title: '',
    value: '<p><br></p>',
    createdAt: new Date().getTime(),
    updatedAt: new Date().getTime(),
    folder: '',
    tags: [],
    isStarred: false,
    isTrashed: false
  };

  // if (type === 'folder') {
  //   newNote.folder = locationId;
  // }

  // if (type === 'tag') {
  //   newNote.tags.push(locationId);
  // }

  return notes.insert(newNote);
}

export default addNote;
