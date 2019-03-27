import electron from 'electron';

const { remote } = electron;
const { dialog } = remote;

export default function confirmFolderDelete() {
  const alertConfig = {
    type: 'info',
    message: 'Tag was successfully deleted.',
    buttons: ['Close']
  };

  dialog.showMessageBox(remote.getCurrentWindow(), alertConfig);
}
