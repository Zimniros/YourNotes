const v4 = require('uuid/v4');
const { isEmpty } = require('lodash');

const db = require('./db');

async function addNote(location) {
  const { notes, folders, tags } = db;

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

  if (!isEmpty(location)) {
    const { locationType, locationId } = location;

    if (locationType === 'folder') {
      const targetFolder = folders.findOne({ id: locationId });
      if (!targetFolder) {
        return Promise.reject(
          new Error(`A folder with the id '${locationId}' doesn't exist.`)
        );
      }

      newNote.folder = locationId;
    }

    if (locationType === 'tag') {
      const targetTag = tags.findOne({ id: locationId });
      if (!targetTag) {
        return Promise.reject(
          new Error(`A tag with the id '${locationId}' doesn't exist.`)
        );
      }

      newNote.tags.push(locationId);
    }
  }

  return notes.insert(newNote);
}

module.exports = addNote;
