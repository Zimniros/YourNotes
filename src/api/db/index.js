const Datastore = require('nedb-promises');
const { remote } = require('electron');
const isDev = require('electron-is-dev');

const dbFactory = fileName =>
  Datastore.create({
    filename: `${
      isDev ? '.' : remote.app.getAppPath('userData')
    }/data/${fileName}`,
    timestampData: true,
    autoload: true
  });

const db = {
  notes: dbFactory('notes.db'),
  tags: dbFactory('tags.db'),
  folders: dbFactory('folders.db')
};

module.exports = db;
