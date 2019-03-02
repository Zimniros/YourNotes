/* eslint-disable consistent-return */
import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import getSearchKey from '../lib/getSearchKey';
import getNotes from '../lib/getNotes';
import { notesDataType, locationType, historyType } from '../../types';

import context from '../../../lib/context';

import NoteItem from './NoteItem';

class NoteList extends Component {
  static propTypes = {
    notesData: notesDataType.isRequired,
    location: locationType.isRequired,
    history: historyType.isRequired,
  };

  notes = [];

  constructor() {
    super();

    this.handleNoteClick = this.handleNoteClick.bind(this);
    this.handleNoteContextMenu = this.handleNoteContextMenu.bind(this);
  }

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

  handleNoteClick(event, noteKey) {
    const { location, history } = this.props;
    const searchKey = getSearchKey(location);
    const { pathname } = location;

    if (noteKey && searchKey !== noteKey) {
      history.push({
        pathname,
        search: `key=${noteKey}`,
      });
    }
  }

  handleNoteContextMenu(event, noteKey) {
    const { location } = this.props;
    const searchKey = getSearchKey(location);
    const { pathname } = location;

    if (searchKey !== noteKey) {
      this.handleNoteClick(event, noteKey);
    }

    const deleteNoteLabel = 'Delete Note';
    const restoreNoteLabel = 'Restore Note';
    const moveToTrashLabel = 'Move to trash';

    const templates = [];

    if (pathname === '/trash') {
      templates.push(
        {
          label: restoreNoteLabel,
          click: () => console.log(restoreNoteLabel),
        },
        {
          label: deleteNoteLabel,
          click: () => console.log(deleteNoteLabel),
        },
      );
    } else {
      templates.push({
        label: moveToTrashLabel,
        click: () => console.log(moveToTrashLabel),
      });
    }

    context.popup(templates);
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
        return (
          <NoteItem
            key={note.key}
            isActive={isActive}
            note={note}
            handleNoteClick={this.handleNoteClick}
            handleNoteContextMenu={this.handleNoteContextMenu}
          />
        );
      })
      : null;

    return <div className="notelist">{noteList}</div>;
  }
}

const mapStateToProps = state => ({ notesData: state.notesData });

export default withRouter(connect(mapStateToProps)(NoteList));
