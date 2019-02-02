import fs from 'fs';
import path from 'path';
import { isEmpty } from 'lodash';
import { Value } from 'slate';

import consts from './consts';
import { noteDefault } from '../renderer/types';

function updateNote(note) {
  if (isEmpty(note)) {
    return Promise.reject(new Error('No input found.'));
  }

  let noteData;
  const { key } = note;
  const notePath = path.join(consts.NOTES_PATH, `${key}.json`);

  try {
    noteData = JSON.parse(fs.readFileSync(notePath));
    noteData.value = Value.fromJSON(JSON.parse(noteData.value));
  } catch (error) {
    console.warn("Can't find note json file.", error);
    noteData = noteDefault;
  }

  Object.assign(noteData, note, {
    key,
    updatedAt: new Date(),
  });

  const data = JSON.stringify(Object.assign({}, noteData, { value: JSON.stringify(noteData.value.toJSON()) }));
  fs.writeFileSync(notePath, data);

  return Promise.resolve(noteData);
}

export default updateNote;
