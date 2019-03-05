/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable react/jsx-one-expression-per-line */
import React, { Component } from 'react';
import Modal from 'react-modal';
import { func } from 'prop-types';
import { connect } from 'react-redux';

import { folderType, notesDataType } from '../../types';
import { updateNote, deleteFolder, closeModal } from '../../actions';

import deleteFolderApi from '../../../lib/deleteFolder';
import updateNoteApi from '../../../lib/updateNote';

class DeleteFolderConfirmationModal extends Component {
  static propTypes = {
    dispatch: func.isRequired,
    folder: folderType.isRequired,
    notesData: notesDataType.isRequired,
  };

  constructor() {
    super();

    this.state = {
      error: '',
    };
  }

  onSubmit(event) {
    event.preventDefault();

    const { dispatch, folder, notesData } = this.props;
    const { allNotes } = notesData;
    const { id } = folder;

    deleteFolderApi(id)
      .then((folderId) => {
        dispatch(deleteFolder(folderId));

        allNotes.forEach((note) => {
          if (note.folder === id) {
            const newNote = Object.assign({}, note, { folder: '', isStarred: false, isTrashed: true });

            updateNoteApi(newNote)
              .then(data => dispatch(updateNote(data)))
              .catch(error => console.log(`Error during ${newNote.key} update`, error, newNote));
          }
        });

        this.onClose();
      })
      .catch(error => this.setState({ error: error.message }));
  }

  onClose() {
    const { dispatch } = this.props;
    this.setState({ error: '' });
    dispatch(closeModal());
  }

  render() {
    const { folder } = this.props;
    const { error } = this.state;

    const { name } = folder;

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
          <h2 className="modal__header">Delete Folder</h2>
          <div className="modal__close" onClick={() => this.onClose()} />
        </div>

        <p className="modal__text-content">
          Are you sure you want to delete <span className="modal__text-content--bold">{name}</span> folder? All of the
          notes in the folder will be moved to the Trash.
        </p>

        <form className="modal__form" onSubmit={event => this.onSubmit(event)}>
          <div className="modal__bottom-row">
            <button className="btn btn--danger " type="submit">
              Delete Folder
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

const mapStateToProps = state => ({ notesData: state.notesData });

export default connect(mapStateToProps)(DeleteFolderConfirmationModal);
