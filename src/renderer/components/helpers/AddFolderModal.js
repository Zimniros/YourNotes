import React from 'react';
import Modal from 'react-modal';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { closeModal } from '../../actions';

// TODO: replace with SASS
const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
  },
};

const AddFolderModal = ({ isOpen, dispatch }) => {
  if (isOpen) {
    return (
      <Modal isOpen={isOpen} onRequestClose={() => dispatch(closeModal())} style={customStyles} ariaHideApp={false}>
        <h2>Add folder modal</h2>
      </Modal>
    );
  }

  return null;
};

const mapStateToProps = state => ({ isOpen: state.modal.isOpen });

export default connect(mapStateToProps)(AddFolderModal);

AddFolderModal.propTypes = {
  isOpen: PropTypes.bool,
  dispatch: PropTypes.func.isRequired,
};

AddFolderModal.defaultProps = {
  isOpen: false,
};
