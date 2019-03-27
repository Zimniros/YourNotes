import electron from 'electron';

const { remote } = electron;
const { dialog } = remote;

export default function confirmDeleteNote() {
  const alertConfig = {
    type: 'warning',
    message: 'Delete note confirmation',
    detail: 'Are you sure you want to delete this note?.',
    buttons: ['Delete Note', 'Cancel']
  };

  const dialogButtonIndex = dialog.showMessageBox(
    remote.getCurrentWindow(),
    alertConfig
  );

  return dialogButtonIndex === 0;
}
