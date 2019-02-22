import React from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import getSearchKey from '../lib/getSearchKey';
import getNotes from '../lib/getNotes';
import { notesDataType, locationType } from '../../types';

import NoteItem from './NoteItem';

const NoteList = ({ notesData, location }) => {
  const { pathname } = location;
  const notes = getNotes(pathname, notesData);
  const locationKey = getSearchKey(location);

  const noteList = notes
    ? notes.map((note) => {
      const isActive = locationKey === note.key;
      return <NoteItem key={note.key} isActive={isActive} note={note} />;
    })
    : null;

  return <div className="notelist">{noteList}</div>;
};

const mapStateToProps = state => ({ notesData: state.notesData });

export default withRouter(connect(mapStateToProps)(NoteList));

NoteList.propTypes = {
  notesData: notesDataType.isRequired,
  location: locationType.isRequired,
};
