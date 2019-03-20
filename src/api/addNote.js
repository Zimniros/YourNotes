import v4 from 'uuid/v4';
import db from './db';

async function addNote(type, locationId) {
  const { notes, folders, tags } = db;

  if (type && locationId) {
    if (type === 'folder') {
      const targetFolder = folders.findOne({ id: locationId });
      if (!targetFolder) {
        return Promise.reject(
          new Error(`A folder with the id '${locationId}' doesn't exist.`)
        );
      }
    }

    if (type === 'tag') {
      const targetTag = tags.findOne({ id: locationId });
      if (!targetTag) {
        return Promise.reject(
          new Error(`A tag with the id '${locationId}' doesn't exist.`)
        );
      }
    }
  }

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

  if (type === 'folder') {
    newNote.folder = locationId;
  }

  if (type === 'tag') {
    newNote.tags.push(locationId);
  }

  return notes.insert(newNote);
}

export default addNote;
