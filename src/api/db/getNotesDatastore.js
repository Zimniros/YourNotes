import DataStore from 'nedb-promises';
import { NOTES_DB_PATH } from '../consts';

const notes = DataStore.create({ filename: NOTES_DB_PATH });

notes.on('load', datastore => {
  console.log('notes loaded', datastore);
});

export default notes;
