import Datastore from 'nedb-promises';
import { remote } from 'electron';

const { app } = remote;

const dbFactory = fileName =>
  Datastore.create({
    filename: `${
      process.env.NODE_ENV === 'dev' ? '.' : app.getAppPath('userData')
    }/data/${fileName}`,
    timestampData: true,
    autoload: true
  });

const db = {
  notes: dbFactory('notes.db'),
  tags: dbFactory('tags.db'),
  folders: dbFactory('folders.db')
};

export default db;
