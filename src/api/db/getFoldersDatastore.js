import DataStore from 'nedb-promises';
import { FOLDERS_DB_PATH } from '../consts';

const folders = DataStore.create({ filename: FOLDERS_DB_PATH });

folders.on('load', datastore => {
  console.log('folders loaded', datastore);
});

export default folders;
