/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { bool, func } from 'prop-types';

import Icon from '@mdi/react';
import { mdiStarOutline as starOutline, mdiStar as star } from '@mdi/js';

import { noteType } from '../../types';
import { formatUpdatedAt } from '../lib/timeHelpers';
import { updateNote } from '../../actions';
import updateNoteApi from '../../../lib/updateNote';

class NoteItem extends Component {
  static propTypes = {
    isActive: bool.isRequired,
    note: noteType.isRequired,
    dispatch: func.isRequired,
    handleNoteClick: func.isRequired,
    handleNoteContextMenu: func.isRequired,
  };

  onStarClick = (event) => {
    event.preventDefault();

    const { dispatch, note } = this.props;

    const newNote = Object.assign({}, note, { isStarred: !note.isStarred });

    updateNoteApi(newNote)
      .then(data => dispatch(updateNote(data)))
      .catch(error => console.log('Error in onStarClick() in NoteItem component', error));
  };

  htmlToText = (html) => {
    const doc = new DOMParser().parseFromString(html, 'text/html');
    return doc.body.textContent || '';
  };

  render() {
    const {
      note, isActive, handleNoteClick, handleNoteContextMenu,
    } = this.props;
    const {
      key, value, title, updatedAt, isStarred, isTrashed,
    } = note;

    const noteContent = this.htmlToText(value);
    const noteContentClassName = `note-item__content${!noteContent ? ' note-item__content--empty' : ''}`;

    const noteClassName = `note-item${isActive ? ' note-item--active' : ''}`;
    const starIcon = isStarred ? star : starOutline;
    const starIconClassName = `note-item__icon note-item__star-icon${
      isStarred ? ' note-item__star-icon--starred' : ''
    }`;

    return (
      <div
        className={noteClassName}
        onClick={event => handleNoteClick(event, key)}
        onContextMenu={event => handleNoteContextMenu(event, key)}
      >
        <div className="note-item__row">
          <div className="note-item__title">{title || 'Untitled'}</div>
          {isTrashed ? null : <Icon className={starIconClassName} path={starIcon} onClick={this.onStarClick} />}
        </div>

        <div className="note-item__updated-at">{formatUpdatedAt(updatedAt)}</div>
        <div className={noteContentClassName}>
          <span>{noteContent || 'Empty note'}</span>
        </div>
      </div>
    );
  }
}

export default withRouter(connect(null)(NoteItem));
