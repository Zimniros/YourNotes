/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable react/jsx-one-expression-per-line */
import React, { Component } from 'react';
import Modal from 'react-modal';
import { func } from 'prop-types';
import { connect } from 'react-redux';

import { noteType } from '../../types';
import { closeModal } from '../../actions';

class DeleteNoteConfirmationModal extends Component {
  static propTypes = {
    dispatch: func.isRequired,
    note: noteType.isRequired,
  };

  constructor() {
    super();

    this.state = {
      error: '',
    };
  }

  onSubmit(event) {
    event.preventDefault();

    const { dispatch, note } = this.props;

    console.log('onSubmit | note', note);

    // addFolderAPI(this.state.folderName)
    //   .then((folder) => {
    //     dispatch(addFolder(folder));
    //     this.onClose(event);
    //   })
    //   .catch(error => this.setState({ error: error.message }));
  }

  onClose() {
    const { dispatch } = this.props;
    this.setState({ error: '' });
    dispatch(closeModal());
  }

  render() {
    const { error } = this.state;

    const errorMessage = error ? <span className="add-folder-modal__error">{error}</span> : null;

    return (
      <Modal
        isOpen
        onRequestClose={() => this.onClose()}
        className="modal"
        overlayClassName="modal__overlay"
        ariaHideApp={false}
      >
        <div className="modal__top-row">
          <h2 className="modal__header">Delete Note</h2>
          <div className="modal__close" onClick={() => this.onClose()} />
        </div>

        <p className="modal__text-content">Are you sure you want to delete this note?</p>

        <form className="modal__form" onSubmit={event => this.onSubmit(event)}>
          <div className="modal__bottom-row">
            <button className="btn btn--danger " type="submit">
              Delete Note
            </button>
            <button className="btn btn--cancel" type="button" onClick={event => this.onClose(event)}>
              Cancel
            </button>
          </div>
        </form>
      </Modal>
    );
  }
}

export default connect(null)(DeleteNoteConfirmationModal);
