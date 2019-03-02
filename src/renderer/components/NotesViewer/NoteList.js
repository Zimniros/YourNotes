/* eslint-disable consistent-return */
import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import getSearchKey from '../lib/getSearchKey';
import getNotes from '../lib/getNotes';
import { notesDataType, locationType, historyType } from '../../types';

import NoteItem from './NoteItem';

class NoteList extends Component {
  static propTypes = {
    notesData: notesDataType.isRequired,
    location: locationType.isRequired,
    history: historyType.isRequired,
  };

  notes = [];

  componentDidMount() {
    const { location, history } = this.props;
    const { pathname } = location;
    const locationKey = getSearchKey(location);
    const note = this.notes[0];

    if (note && !locationKey) {
      history.replace({
        pathname,
        search: `key=${note.key}`,
      });
    }
  }

  componentDidUpdate(prevProps) {
    const { location, history } = this.props;
    const { pathname } = location;
    const locationKey = getSearchKey(prevProps.location);
    const noteWithLocationKey = this.notes.find(el => el.key === locationKey);
    const note = this.notes[0];

    if (prevProps.location.pathname !== pathname) {
      if (noteWithLocationKey) {
        return history.replace({ pathname, search: `key=${noteWithLocationKey.key}` });
      }

      if (note) {
        return history.replace({ pathname, search: `key=${note.key}` });
      }
    }
  }

  render() {
    const { location, notesData } = this.props;
    const { pathname } = location;
    const notes = getNotes(pathname, notesData);
    const locationKey = getSearchKey(location);
    this.notes = notes;

    const noteList = notes
      ? notes.map((note) => {
        const isActive = locationKey === note.key;
        return <NoteItem key={note.key} isActive={isActive} note={note} />;
      })
      : null;

    return <div className="notelist">{noteList}</div>;
  }
}

const mapStateToProps = state => ({ notesData: state.notesData });

export default withRouter(connect(mapStateToProps)(NoteList));
