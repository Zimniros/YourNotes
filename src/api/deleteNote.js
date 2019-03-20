import { isEmpty } from 'lodash';
import db from './db';

async function deleteNote(key) {
  if (isEmpty(key)) {
    return Promise.reject(new Error('No note key was provided.'));
  }

  await db.notes.remove({ key });

  return Promise.resolve(key);
}

export default deleteNote;
