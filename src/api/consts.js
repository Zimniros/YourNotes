import { remote } from 'electron';
import path from 'path';

const { app } = remote;

export const NOTES_DB_PATH = path.join(app.getPath('userData'), 'notes.db');
export const FOLDERS_DB_PATH = path.join(app.getPath('userData'), 'folders.db');
export const TAGS_DB_PATH = path.join(app.getPath('userData'), 'tags.db');

export default {
  NOTES_DB_PATH,
  FOLDERS_DB_PATH,
  TAGS_DB_PATH
};
