import React from 'react';
import { Link, withRouter } from 'react-router-dom';

import { noteType, locationType } from '../../types';
import { formatUpdatedAt } from '../lib/timeHelpers';

const NoteItem = ({ note, location }) => {
  const {
    key, title, content, updatedAt,
  } = note;
  const { pathname } = location;

  return (
    <Link
      to={{
        pathname,
        search: `?key=${key}`,
      }}
      className="note-item"
    >
      <div className="note-item__title">{title || 'Untitled'}</div>
      <div className="note-item__updated-at">{formatUpdatedAt(updatedAt)}</div>
      <div className="note-item__content">
        <span>{content || 'Empty note'}</span>
      </div>
    </Link>
  );
};

export default withRouter(NoteItem);

NoteItem.propTypes = {
  note: noteType.isRequired,
  location: locationType.isRequired,
};
