import DataStore from 'nedb-promises';
import { TAGS_DB_PATH } from '../consts';

const tags = DataStore.create({ filename: TAGS_DB_PATH });

tags.on('load', datastore => {
  console.log('tags loaded', datastore);
});

export default tags;
