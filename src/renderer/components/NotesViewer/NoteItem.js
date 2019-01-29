import React from 'react';
import { noteType } from '../../types';

const NoteItem = ({ note }) => {
  const {
    title, content, tags, updatedAt,
  } = note;

  return (
    <div className="note-item">
      <div className="note-item__row">
        <div className="note-item__title">{title || 'Untitled'}</div>
        <div className="note-item__updated-at">{updatedAt.toString()}</div>
      </div>
      <div className="note-item__content">{content || 'Empty note'}</div>
      <div className="note-item__tags">{tags || 'No tags'}</div>
    </div>
  );
};

export default NoteItem;

NoteItem.propTypes = {
  note: noteType.isRequired,
};
