import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { bool, func } from 'prop-types';

import Icon from '@mdi/react';
import { mdiStarOutline as starOutline, mdiStar as star } from '@mdi/js';

import { noteType, locationType } from '../../types';
import { formatUpdatedAt } from '../lib/timeHelpers';
import { updateNote } from '../../actions';
import updateNoteApi from '../../../lib/updateNote';

class NoteItem extends Component {
  static propTypes = {
    isActive: bool.isRequired,
    note: noteType.isRequired,
    location: locationType.isRequired,
    dispatch: func.isRequired,
  };

  onStarClick = (event) => {
    event.preventDefault();

    const { dispatch, note } = this.props;

    const newNote = Object.assign({}, note, { isStarred: !note.isStarred });

    updateNoteApi(newNote)
      .then(data => dispatch(updateNote(data)))
      .catch(error => console.log('Error in onStarClick() in NoteItem component', error));
  };

  render() {
    const { note, location, isActive } = this.props;
    const {
      key, value, title, updatedAt, isStarred,
    } = note;
    const { pathname } = location;
    const { text } = value.document;
    const className = `note-item${isActive ? ' note-item--active' : ''}`;
    const starIcon = isStarred ? star : starOutline;
    const starIconClassName = `note-item__icon note-item__star-icon${
      isStarred ? ' note-item__star-icon--starred' : ''
    }`;

    return (
      <Link
        to={{
          pathname,
          search: `?key=${key}`,
        }}
        className={className}
      >
        <div className="note-item__row">
          <div className="note-item__title">{title || 'Untitled'}</div>
          <Icon className={starIconClassName} path={starIcon} onClick={this.onStarClick} />
        </div>

        <div className="note-item__updated-at">{formatUpdatedAt(updatedAt)}</div>
        <div className="note-item__content">
          <span>{text || 'Note value'}</span>
        </div>
      </Link>
    );
  }
}

export default withRouter(connect(null)(NoteItem));
