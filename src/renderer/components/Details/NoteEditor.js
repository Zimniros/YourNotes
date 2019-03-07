/* eslint-disable react/prop-types */
/* eslint-disable react/no-did-update-set-state */
/* eslint-disable class-methods-use-this */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/no-unused-state */
/* eslint-disable react/no-unused-vars */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

import TitleBar from './TitleBar';
import StorageInfoBar from './StorageInfoBar';

import { updateNote, showDeleteNoteConfirmationModal } from '../../actions';
import updateNoteApi from '../../../lib/updateNote';

class NoteEditor extends Component {
  constructor(props) {
    super(props);
    this.className = 'details__editor';

    this.state = {
      note: props.note,
    };

    this.delayTimer = null;
    this.isReady = false;
  }

  componentWillReceiveProps(nextProps) {
    const isNewNote = nextProps.note.key !== this.props.note.key;

    if (isNewNote) {
      this.saveNoteNow();
    }

    this.setState({ note: nextProps.note });
  }

  onInputChange = (event) => {
    const { note } = this.state;
    const { value: title } = event.target;
    const updatedAt = new Date().getTime();

    this.setState({ note: Object.assign({}, note, { title, updatedAt }) }, () => {
      this.saveNote();
    });
  };

  onChange = (value) => {
    const { note } = this.state;
    const updatedAt = new Date().getTime();

    this.setState({ note: Object.assign({}, note, { value, updatedAt }) }, () => {
      this.saveNote();
    });
  };

  onStarClick = (event) => {
    event.preventDefault();

    const { dispatch, note } = this.props;

    const newNote = Object.assign({}, note, { isStarred: !note.isStarred });

    updateNoteApi(newNote)
      .then(data => dispatch(updateNote(data)))
      .catch(error => console.log('Error in onStarClick() in NoteItem component', error));
  };

  onTrashClick = (event) => {
    event.preventDefault();

    const {
      dispatch, note, history, location,
    } = this.props;
    const { pathname } = location;

    const newNote = Object.assign({}, note, { isStarred: false, isTrashed: true });

    updateNoteApi(newNote).then((data) => {
      dispatch(updateNote(data));

      history
        .replace({
          pathname,
        })

        .catch(error => console.log('Error in onStarClick() in NoteItem component', error));
    });
  };

  handleRestore = () => {
    const { dispatch, note } = this.props;

    const newNote = Object.assign({}, note, { isTrashed: false });

    updateNoteApi(newNote)
      .then(data => dispatch(updateNote(data)))
      .catch(error => console.log('Error in handleRestore() in NoteItem component', error));
  };

  handleDelete = () => {
    const { dispatch, note } = this.props;
    dispatch(showDeleteNoteConfirmationModal(note));
  };

  saveNote() {
    clearTimeout(this.delayTimer);
    this.delayTimer = setTimeout(() => {
      this.saveNoteNow();
    }, 1000);
  }

  saveNoteNow() {
    const { dispatch } = this.props;
    const { note } = this.state;
    clearTimeout(this.delayTimer);
    this.delayTimer = null;

    updateNoteApi(note)
      .then(data => dispatch(updateNote(data)))
      .catch(error => console.log('Error in saveNoteNow()', error));
  }

  render() {
    const { note } = this.state;

    const {
      value, title, folder, isStarred, isTrashed,
    } = note;

    return (
      <div className="details">
        <div className="details__title-bar">
          <TitleBar
            onStarClick={this.onStarClick}
            onTrashClick={this.onTrashClick}
            onInputChange={this.onInputChange}
            handleRestore={this.handleRestore}
            handleDelete={this.handleDelete}
            title={title}
            folderId={folder}
            isStarred={isStarred}
            isTrashed={isTrashed}
          />

          <StorageInfoBar note={note} />
        </div>

        <ReactQuill className={this.className} value={value} onChange={this.onChange} readOnly={isTrashed} />
      </div>
    );
  }
}

export default withRouter(connect(null)(NoteEditor));
