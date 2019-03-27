/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable react/jsx-one-expression-per-line */
import React, { Component } from 'react';
import Modal from 'react-modal';
import { func } from 'prop-types';
import { connect } from 'react-redux';
import remove from 'lodash/remove';

import { tagType, notesDataType } from '../../types';
import { updateNote, closeModal } from '../../actions';
import { deleteTag } from '../../actions/tags';

class DeleteTagConfirmationModal extends Component {
  static propTypes = {
    dispatch: func.isRequired,
    tag: tagType.isRequired,
    notesData: notesDataType.isRequired
  };

  constructor() {
    super();

    this.state = {
      error: ''
    };
  }

  onSubmit(event) {
    event.preventDefault();

    const { dispatch, tag, notesData } = this.props;
    const { allNotes } = notesData;
    const { id: tagId } = tag;

    dispatch(deleteTag(tagId)).then(deletedId => {
      const notes = allNotes
        .toArray()
        .filter(note => note.tags.includes(deletedId));

      const promises = notes.map(note => {
        const { key: noteKey, tags } = note;

        remove(tags, el => el === deletedId);

        const input = {
          tags: tags.slice()
        };

        return dispatch(updateNote(noteKey, input)).catch(error =>
          console.log(`Error during ${noteKey} update`, error, input)
        );
      });
      Promise.all(promises).then(() => this.onClose());
    });
  }

  onClose() {
    const { dispatch } = this.props;
    this.setState({ error: '' });
    dispatch(closeModal());
  }

  render() {
    const { tag } = this.props;
    const { error } = this.state;

    const { name } = tag;

    const errorMessage = error ? (
      <span className="add-folder-modal__error">{error}</span>
    ) : null;

    return (
      <Modal
        isOpen
        onRequestClose={() => this.onClose()}
        className="modal"
        overlayClassName="modal__overlay"
        ariaHideApp={false}
      >
        <div className="modal__top-row">
          <h2 className="modal__header">Delete Tag</h2>
          <div className="modal__close" onClick={() => this.onClose()} />
        </div>

        <p className="modal__text-content">
          Are you sure you want to delete{' '}
          <span className="modal__text-content--bold">{name}</span> tag?
        </p>

        <form className="modal__form" onSubmit={event => this.onSubmit(event)}>
          <div className="modal__bottom-row">
            <button className="btn btn--danger " type="submit">
              Delete Tag
            </button>
            <button
              className="btn btn--cancel"
              type="button"
              onClick={event => this.onClose(event)}
            >
              Cancel
            </button>
          </div>
        </form>
      </Modal>
    );
  }
}

const mapStateToProps = state => ({ notesData: state.notesData });

export default connect(mapStateToProps)(DeleteTagConfirmationModal);
