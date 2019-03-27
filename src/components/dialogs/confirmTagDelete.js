import electron from 'electron';

const { remote } = electron;
const { dialog } = remote;

export default function confirmFolderDelete(tagName) {
  const alertConfig = {
    type: 'warning',
    message: 'Delete tag confirmation',
    detail: `Are you sure you want to delete '${tagName}' tag?`,
    buttons: ['Delete Tag', 'Cancel']
  };

  const dialogButtonIndex = dialog.showMessageBox(
    remote.getCurrentWindow(),
    alertConfig
  );

  return dialogButtonIndex === 0;
}
