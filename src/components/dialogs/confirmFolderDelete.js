import electron from 'electron';

const { remote } = electron;
const { dialog } = remote;

export default function confirmFolderDelete() {
  const alertConfig = {
    type: 'warning',
    message: 'Delete folder confirmation',
    detail:
      'Are you sure you want to delete this folder? All of the notes in the folder will be moved to the Trash.',
    buttons: ['Delete Folder', 'Cancel']
  };

  const dialogButtonIndex = dialog.showMessageBox(
    remote.getCurrentWindow(),
    alertConfig
  );

  return dialogButtonIndex === 0;
}
