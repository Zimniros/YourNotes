import { remote } from 'electron';
import path from 'path';

const { app } = remote;

const consts = {
  STORAGE_PATH: app.getPath('userData'),
  JSON_PATH: path.join(app.getPath('userData'), 'yournotes.json'),
};

export default consts;
