import React from 'react';
import { formatUpdatedAt } from '../lib/timeHelpers';

import { noteType } from '../../types';

const NoteItem = ({ note }) => {
  const { title, content, updatedAt } = note;

  return (
    <div className="note-item">
      <div className="note-item__title">{title || 'Untitled'}</div>
      <div className="note-item__updated-at">{formatUpdatedAt(updatedAt)}</div>
      <div className="note-item__content">
        <span>{content || 'Empty note'}</span>
      </div>
    </div>
  );
};

export default NoteItem;

NoteItem.propTypes = {
  note: noteType.isRequired,
};
