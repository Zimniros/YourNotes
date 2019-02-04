/* eslint-disable react/no-unused-state */
/* eslint-disable class-methods-use-this */
/* eslint-disable react/prop-types */
/* eslint-disable react/destructuring-assignment */
import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { Value } from 'slate';

import NoteEditor from './NoteEditor';
import getSearchKey from '../lib/getSearchKey';

class Details extends Component {
  getNote() {
    const { location, notes } = this.props;
    const key = getSearchKey(location);

    if (!key) return null;

    const note = notes.get(key);

    return note || null;
  }

  render() {
    const note = this.getNote();

    if (note) {
      return <NoteEditor note={note} />;
    }

    return <div>Create new note</div>;
  }
}

const mapStateToProps = state => ({ notes: state.notesData.allNotes });

export default withRouter(connect(mapStateToProps)(Details));
