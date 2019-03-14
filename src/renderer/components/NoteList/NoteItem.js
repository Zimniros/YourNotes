/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React from 'react';
import { bool, func, string } from 'prop-types';

import Icon from '@mdi/react';
import { mdiStarOutline as starOutline, mdiStar as star } from '@mdi/js';

import { noteType } from '../../types';
import { formatUpdatedAt } from '../lib/timeHelpers';

function htmlToText(html) {
  const doc = new DOMParser().parseFromString(html, 'text/html');
  return doc.body.textContent || '';
}

const NoteItem = ({
  note, sortField, isActive, handleStarClick, handleNoteClick, handleNoteContextMenu,
}) => {
  const {
    key, value, title, createdAt, updatedAt, isStarred, isTrashed,
  } = note;

  const noteContent = htmlToText(value);
  const noteContentClassName = `note-item__content${!noteContent ? ' note-item__content--empty' : ''}`;

  const noteDisplayDate = sortField === 'CREATED_AT' ? createdAt : updatedAt;

  const noteClassName = `note-item${isActive ? ' note-item--active' : ''}`;
  const starIcon = isStarred ? star : starOutline;
  const starIconClassName = `note-item__icon note-item__star-icon${isStarred ? ' note-item__star-icon--starred' : ''}`;

  return (
    <div
      className={noteClassName}
      onClick={() => handleNoteClick(key)}
      onContextMenu={() => handleNoteContextMenu(note)}
    >
      <div className="note-item__row">
        <div className="note-item__title">{title || 'Untitled'}</div>
        {isTrashed ? null : (
          <Icon className={starIconClassName} path={starIcon} onClick={() => handleStarClick(note)} />
        )}
      </div>

      <div className="note-item__displayed-date">{formatUpdatedAt(noteDisplayDate)}</div>
      <div className={noteContentClassName}>
        <span>{noteContent || 'Empty note'}</span>
      </div>
    </div>
  );
};

export default NoteItem;

NoteItem.propTypes = {
  isActive: bool.isRequired,
  note: noteType.isRequired,
  sortField: string.isRequired,
  handleStarClick: func.isRequired,
  handleNoteClick: func.isRequired,
  handleNoteContextMenu: func.isRequired,
};
