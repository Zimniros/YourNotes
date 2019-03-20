import { isEmpty } from 'lodash';

import db from './db';
import { noteDefault } from '../types';

async function updateNote(note) {
  if (isEmpty(note)) {
    return Promise.reject(new Error('No input found.'));
  }

  const { key } = note;

  const targetNote = await db.notes.find({ key });

  const noteData = targetNote || noteDefault;

  if (noteData.title !== note.title || noteData.value !== note.value) {
    noteData.updatedAt = new Date().getTime();
  }

  const data = Object.assign({}, noteData, note);
  await db.notes.update({ key }, data);

  return Promise.resolve(data);
}

export default updateNote;
