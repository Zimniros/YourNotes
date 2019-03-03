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

import { updateNote } from '../../actions';
import updateNoteApi from '../../../lib/updateNote';

class NoteEditor extends Component {
  constructor(props) {
    super(props);
    this.className = 'details__editor';

    this.state = {
      note: null,
    };

    this.delayTimer = null;
    this.isReady = false;
  }

  componentDidMount() {
    const { note } = this.props;
    this.setState({ note });
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

  handleRestore= () => {
    const { dispatch, note } = this.props;

    const newNote = Object.assign({}, note, { isTrashed: false });

    updateNoteApi(newNote)
      .then(data => dispatch(updateNote(data)))
      .catch(error => console.log('Error in handleRestore() in NoteItem component', error));
  }

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

    if (!note) return <div />;

    const {
      value, title, isStarred, isTrashed,
    } = note;

    return (
      <div className="details">
        <TitleBar
          onStarClick={this.onStarClick}
          onTrashClick={this.onTrashClick}
          onInputChange={this.onInputChange}
          handleRestore={this.handleRestore}
          title={title}
          isStarred={isStarred}
          isTrashed={isTrashed}
        />

        <ReactQuill className={this.className} value={value} onChange={this.onChange} readOnly={isTrashed} />
      </div>
    );
  }
}

export default withRouter(connect(null)(NoteEditor));
