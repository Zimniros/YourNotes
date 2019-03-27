import React, { Component } from 'react';
import { connect } from 'react-redux';
import { func } from 'prop-types';

import Icon from '@mdi/react';
import {
  mdiStarOutline as starOutline,
  mdiStar as star,
  mdiTrashCanOutline as trashIcon,
  mdiInformationOutline as infoIcon
} from '@mdi/js';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

import { updateNote, deleteNote } from '../../actions';
import { noteType } from '../../types';

import FolderSelect from './FolderSelect';
import TagSelect from './TagSelect';

import confirmNoteDelete from '../dialogs/confirmNoteDelete';

class NoteEditor extends Component {
  static propTypes = {
    note: noteType.isRequired,
    dispatch: func.isRequired
  };

  constructor(props) {
    super(props);

    this.state = {
      note: props.note
    };

    this.modules = {
      toolbar: [
        [{ header: [1, 2, false] }],
        ['bold', 'italic', 'underline', 'strike', 'blockquote'],
        [
          { list: 'ordered' },
          { list: 'bullet' },
          { indent: '-1' },
          { indent: '+1' }
        ],
        ['link', 'image'],
        ['clean']
      ]
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
      'image'
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

  onInputChange = event => {
    const { note } = this.state;
    const { value: title } = event.target;

    this.setState({ note: Object.assign({}, note, { title }) }, () => {
      this.saveNote();
    });
  };

  onChange = value => {
    const { note } = this.state;

    this.setState({ note: Object.assign({}, note, { value }) }, () => {
      this.saveNote();
    });
  };

  onStarClick = event => {
    event.preventDefault();

    const { note } = this.state;

    const { isStarred } = note;
    const input = {
      isStarred: !isStarred
    };

    this.setState({ note: Object.assign({}, note, input) }, () => {
      this.saveNoteNow();
    });
  };

  onTrashClick = event => {
    event.preventDefault();

    const { note } = this.state;

    const input = {
      isStarred: false,
      isTrashed: true
    };

    this.setState({ note: Object.assign({}, note, input) }, () => {
      this.saveNoteNow();
    });
  };

  handleRestore = () => {
    const { note } = this.state;
    const input = {
      isTrashed: false
    };

    this.setState({ note: Object.assign({}, note, input) }, () => {
      this.saveNoteNow();
    });
  };

  handleDelete = () => {
    const { dispatch, note } = this.props;
    const { key } = note;

    if (confirmNoteDelete()) {
      dispatch(deleteNote(key));
    }
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
    const { key: noteKey } = note;
    clearTimeout(this.delayTimer);
    this.delayTimer = null;

    dispatch(updateNote(noteKey, note)).catch(error =>
      console.log('Error in saveNoteNow() in NoteEditor component', error)
    );
  }

  render() {
    const { note } = this.state;

    const { value, title, isStarred, isTrashed } = note;

    const starIcon = isStarred ? star : starOutline;
    const starIconClassName = `control-group__star-icon${
      isStarred ? ' control-group__star-icon--starred' : ''
    }`;

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
        <Icon
          className={starIconClassName}
          onClick={this.onStarClick}
          path={starIcon}
        />
        <Icon
          className="control-group__icon"
          onClick={this.onTrashClick}
          path={trashIcon}
        />
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

export default connect(null)(NoteEditor);
