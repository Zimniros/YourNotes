/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import { folderPathnameRegex, sidebarShortcuts } from '../lib/consts';

import NoteItem from './NoteItem';

class NoteList extends Component {
  getNotes() {
    const { location, notes } = this.props;
    const { pathname } = location;

    const match = pathname.match(folderPathnameRegex);

    if (match) {
      return notes.filter(({ folder }) => folder === match[1]);
    }

    return notes;
  }

  renderNotes() {
    const notes = this.getNotes();

    return notes ? notes.map(note => <NoteItem key={note.key} note={note} />) : null;
  }

  render() {
    return <div className="notelist">{this.renderNotes()}</div>;
  }
}

const mapStateToProps = state => ({ notes: state.notes.toArray() });

export default withRouter(connect(mapStateToProps)(NoteList));
