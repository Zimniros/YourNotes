import { remote } from 'electron';

const { app } = remote;

const consts = {
  STORAGE_PATH: app.getPath('userData'),
};

export default consts;
