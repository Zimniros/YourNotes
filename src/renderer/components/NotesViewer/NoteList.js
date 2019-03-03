/* eslint-disable consistent-return */
import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { func } from 'prop-types';

import getSearchKey from '../lib/getSearchKey';
import getNotes from '../lib/getNotes';
import { notesDataType, locationType, historyType } from '../../types';

import { updateNote } from '../../actions';
import updateNoteApi from '../../../lib/updateNote';

import context from '../../../lib/context';

import NoteItem from './NoteItem';

class NoteList extends Component {
  static propTypes = {
    notesData: notesDataType.isRequired,
    location: locationType.isRequired,
    history: historyType.isRequired,
    dispatch: func.isRequired,
  };

  notes = [];

  constructor() {
    super();

    this.handleStarClick = this.handleStarClick.bind(this);
    this.handleRestore = this.handleRestore.bind(this);
    this.handleTrash = this.handleTrash.bind(this);
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

  // TODO: if locationKey is not in this.notes
  // TODO: no notes
  componentDidUpdate(prevProps) {
    const { location, history } = this.props;
    const { pathname } = location;
    const locationKey = getSearchKey(location);
    const prevLocationKey = getSearchKey(prevProps.location);
    const noteWithLocationKey = this.notes.find(el => el.key === prevLocationKey);
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

  handleNoteClick(noteKey) {
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

  handleNoteContextMenu(note) {
    const { location } = this.props;
    const searchKey = getSearchKey(location);
    const { pathname } = location;
    const { key } = note;

    if (searchKey !== key) {
      this.handleNoteClick(key);
    }

    const deleteNoteLabel = 'Delete Note';
    const restoreNoteLabel = 'Restore Note';
    const moveToTrashLabel = 'Move to trash';

    const templates = [];

    if (pathname === '/trash') {
      templates.push(
        {
          label: restoreNoteLabel,
          click: () => this.handleRestore(note),
        },
        {
          label: deleteNoteLabel,
          click: () => console.log(deleteNoteLabel),
        },
      );
    } else {
      templates.push({
        label: moveToTrashLabel,
        click: () => this.handleTrash(note),
      });
    }

    context.popup(templates);
  }

  handleStarClick(note) {
    const { dispatch } = this.props;

    const newNote = Object.assign({}, note, { isStarred: !note.isStarred });

    updateNoteApi(newNote)
      .then(data => dispatch(updateNote(data)))
      .catch(error => console.log('Error in handleStarClick() in NoteItem component', error));
  }

  handleTrash(note) {
    const { dispatch } = this.props;

    const newNote = Object.assign({}, note, { isStarred: false, isTrashed: true });

    updateNoteApi(newNote)
      .then(data => dispatch(updateNote(data)))
      .catch(error => console.log('Error in handleTrash() in NoteItem component', error));
  }

  handleRestore(note) {
    const { dispatch } = this.props;

    const newNote = Object.assign({}, note, { isTrashed: false });

    updateNoteApi(newNote)
      .then(data => dispatch(updateNote(data)))
      .catch(error => console.log('Error in handleRestore() in NoteItem component', error));
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
            handleStarClick={this.handleStarClick}
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
