import React from 'react';
import { connect } from 'react-redux';

import AddFolderModal from './AddFolderModal';
import DeleteFolderConfirmationModal from './DeleteFolderConfirmationModal';

const MODAL_COMPONENTS = {
  ADD_FOLDER: AddFolderModal,
  DELETE_FOLDER_CONFIRMATION: DeleteFolderConfirmationModal,
};

const ModalRoot = ({ modalType, modalProps }) => {
  if (!modalType) {
    return null;
  }

  const SpecificModal = MODAL_COMPONENTS[modalType];

  return <SpecificModal {...modalProps} />;
};

export default connect(state => state.modal)(ModalRoot);
