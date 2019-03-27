import React from 'react';
import { connect } from 'react-redux';

import AddFolderModal from './AddFolderModal';
import RenameFolderModal from './RenameFolderModal';
import AddTagModal from './AddTagModal';
import RenameTagModal from './RenameTagModal';

const MODAL_COMPONENTS = {
  ADD_FOLDER: AddFolderModal,
  RENAME_FOLDER: RenameFolderModal,
  ADD_TAG: AddTagModal,
  RENAME_TAG: RenameTagModal
};

const ModalRoot = ({ modalType, modalProps }) => {
  if (!modalType) {
    return null;
  }

  const SpecificModal = MODAL_COMPONENTS[modalType];

  return <SpecificModal {...modalProps} />;
};

export default connect(state => state.modal)(ModalRoot);
