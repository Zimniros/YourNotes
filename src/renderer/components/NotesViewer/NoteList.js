/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import { folderPathnameRegex } from '../lib/consts';
import getSearchKey from '../lib/getSearchKey';

import NoteItem from './NoteItem';

class NoteList extends Component {
  getNotes() {
    const { location, notesData } = this.props;
    const { allNotes, starredNotes } = notesData;
    const { pathname } = location;

    const match = pathname.match(folderPathnameRegex);

    if (pathname === '/starred') {
      return starredNotes.map(key => allNotes.get(key));
    }

    if (match) {
      return allNotes.toArray().filter(({ folder }) => folder === match[1]);
    }

    return allNotes.toArray();
  }

  renderNotes() {
    const { location } = this.props;
    const notes = this.getNotes();
    const locationKey = getSearchKey(location);

    return notes
      ? notes.map((note) => {
        const isActive = locationKey === note.key;
        return <NoteItem key={note.key} isActive={isActive} note={note} />;
      })
      : null;
  }

  render() {
    return <div className="notelist">{this.renderNotes()}</div>;
  }
}

const mapStateToProps = state => ({ notesData: state.notesData });

export default withRouter(connect(mapStateToProps)(NoteList));
