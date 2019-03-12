import React, { Component } from 'react';
import { connect } from 'react-redux';
import { func } from 'prop-types';
import { withRouter } from 'react-router-dom';

import Icon from '@mdi/react';
import {
  mdiStarOutline as starOutline,
  mdiStar as star,
  mdiTrashCanOutline as trashIcon,
  mdiInformationOutline as infoIcon,
} from '@mdi/js';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

import { updateNote, showDeleteNoteConfirmationModal } from '../../actions';
import updateNoteApi from '../../../lib/updateNote';
import { noteType, historyType, locationType } from '../../types';

import FolderSelect from './FolderSelect';
import TagSelect from './TagSelect';

class NoteEditor extends Component {
  static propTypes = {
    note: noteType.isRequired,
    dispatch: func.isRequired,
    history: historyType.isRequired,
    location: locationType.isRequired,
  };

  constructor(props) {
    super(props);

    this.state = {
      note: props.note,
    };

    this.modules = {
      toolbar: [
        [{ header: [1, 2, false] }],
        ['bold', 'italic', 'underline', 'strike', 'blockquote'],
        [{ list: 'ordered' }, { list: 'bullet' }, { indent: '-1' }, { indent: '+1' }],
        ['link', 'image'],
        ['clean'],
      ],
    };

    this.formats = [
      'header',
      'bold',
      'italic',
      'underline',
      'strike',
      'blockquote',
      'list',
      'bullet',
      'indent',
      'link',
      'image',
    ];

    this.delayTimer = null;
    this.isReady = false;
  }

  componentWillReceiveProps(nextProps) {
    const { note } = this.props;
    const { key } = note;

    const isNewNote = nextProps.note.key !== key;

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
      value, title, isStarred, isTrashed,
    } = note;

    const starIcon = isStarred ? star : starOutline;
    const starIconClassName = `control-group__star-icon${isStarred ? ' control-group__star-icon--starred' : ''}`;

    const rightInfoGroup = isTrashed ? (
      <>
        <button
          type="button"
          className="control-group__button control-group__button--restore"
          onClick={this.handleRestore}
        >
          Restore note
        </button>
        <button
          type="button"
          className="control-group__button control-group__button--delete"
          onClick={this.handleDelete}
        >
          Delete note
        </button>
      </>
    ) : (
      <>
        <Icon className={starIconClassName} onClick={this.onStarClick} path={starIcon} />
        <Icon className="control-group__icon" onClick={this.onTrashClick} path={trashIcon} />
        <Icon className="control-group__icon" path={infoIcon} />
      </>
    );

    return (
      <div className="details">
        <div className="details__info">
          <div className="details__info-row">
            <FolderSelect note={note} />

            <div className="details__control-group">{rightInfoGroup}</div>
          </div>

          <TagSelect note={note} />
        </div>

        <div className="details__title-bar">
          <input
            type="text"
            className="title-bar__title"
            placeholder="Untitled"
            value={title}
            onChange={this.onInputChange}
            disabled={isTrashed}
          />
        </div>

        <ReactQuill
          className="details__editor"
          value={value}
          modules={this.modules}
          formats={this.formats}
          onChange={(newValue, delta, source) => {
            if (source === 'user') {
              this.onChange(newValue);
            }
          }}
          readOnly={isTrashed}
        />
      </div>
    );
  }
}

export default withRouter(connect(null)(NoteEditor));
