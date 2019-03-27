/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { string, func, instanceOf } from 'prop-types';
import { connect } from 'react-redux';
import { remove } from 'lodash';

import Icon from '@mdi/react';
import { mdiChevronRight as chevronIcon, mdiPlus as plusIcon } from '@mdi/js';

import context from '../../api/context';
import Map from '../../api/Map';
import getNotes from '../lib/getNotes';
import getNotesAmount from '../lib/getNotesAmount';

import { notesDataType } from '../../types';

import {
  updateNote,
  showAddFolderModal,
  showAddTagModal,
  showRenameFolderModal,
  showRenameTagModal
} from '../../actions';

import { deleteFolder } from '../../actions/folders';
import { deleteTag } from '../../actions/tags';

import confirmFolderDelete from '../dialogs/confirmFolderDelete';
import folderDeletionSuccess from '../dialogs/folderDeletionSuccess';

import confirmTagDelete from '../dialogs/confirmTagDelete';
import tagDeletionSuccess from '../dialogs/tagDeletionSuccess';

import ShortcutItem from './ShortcutItem';

const LABELS = {
  folderList: {
    renameLabel: 'Rename folder',
    deleteLabel: 'Delete folder',
    emptyLabel: 'Your list of folders will show up here.'
  },
  tagList: {
    renameLabel: 'Rename tag',
    deleteLabel: 'Delete tag',
    emptyLabel: 'Your list of tags will show up here.'
  }
};

class ShortcutList extends Component {
  static propTypes = {
    list: instanceOf(Map).isRequired,
    notesData: notesDataType.isRequired,
    title: string.isRequired,
    listType: string.isRequired,
    dispatch: func.isRequired
  };

  constructor() {
    super();

    this.state = {
      isOpen: false
    };

    this.contextMenu = this.contextMenu.bind(this);
    this.onTitleClick = this.onTitleClick.bind(this);
    this.onNewClick = this.onNewClick.bind(this);
  }

  onNewClick(event) {
    event.preventDefault();
    event.stopPropagation();

    const { dispatch, listType } = this.props;

    if (listType === 'folderList') {
      dispatch(showAddFolderModal());
    }

    if (listType === 'tagList') {
      dispatch(showAddTagModal());
    }
  }

  onDelete(item) {
    const { dispatch, listType, notesData } = this.props;
    const { allNotes } = notesData;
    const { id, name } = item;

    if (listType === 'folderList' && confirmFolderDelete()) {
      dispatch(deleteFolder(id)).then(() => {
        const notes = allNotes.toArray().filter(note => note.folder === id);

        const promises = notes.map(note => {
          const { key: noteKey } = note;

          const input = {
            folder: '',
            isStarred: false,
            isTrashed: true
          };

          return dispatch(updateNote(noteKey, input)).catch(error =>
            console.log(`Error during ${noteKey} update`, error, input)
          );
        });
        Promise.all(promises).then(() => folderDeletionSuccess());
      });
    }

    if (listType === 'tagList' && confirmTagDelete(name)) {
      dispatch(deleteTag(id)).then(deletedId => {
        const notes = allNotes
          .toArray()
          .filter(note => note.tags.includes(deletedId));

        const promises = notes.map(note => {
          const { key: noteKey, tags } = note;

          remove(tags, el => el === deletedId);

          const input = {
            tags: tags.slice()
          };

          return dispatch(updateNote(noteKey, input)).catch(error =>
            console.log(`Error during ${noteKey} update`, error, input)
          );
        });
        Promise.all(promises).then(() => tagDeletionSuccess());
      });
    }
  }

  onRename(item) {
    const { dispatch, listType } = this.props;

    if (listType === 'folderList') {
      dispatch(showRenameFolderModal(item));
    }

    if (listType === 'tagList') {
      dispatch(showRenameTagModal(item));
    }
  }

  onTitleClick(event) {
    event.preventDefault();
    const { isOpen } = this.state;

    this.setState({ isOpen: !isOpen });
  }

  contextMenu(item) {
    const { listType } = this.props;

    const { deleteLabel, renameLabel } = LABELS[listType];

    const templates = [];

    templates.push(
      {
        label: renameLabel,
        click: () => this.onRename(item)
      },
      {
        label: deleteLabel,
        click: () => this.onDelete(item)
      }
    );

    context.popup(templates);
  }

  render() {
    const { isOpen } = this.state;
    const { list, listType, title, notesData } = this.props;

    const { emptyLabel } = LABELS[listType];

    const listContent =
      list && list.size
        ? list.map(item => {
            let pathTo;

            if (listType === 'folderList') {
              pathTo = `/folder/${item.id}`;
            }

            if (listType === 'tagList') {
              pathTo = `/tag/${item.id}`;
            }

            const notes = getNotes(pathTo, notesData);
            const notesAmount = getNotesAmount(notes);

            return (
              <ShortcutItem
                key={item.id}
                item={item}
                pathTo={pathTo}
                notesAmount={notesAmount}
                onItemContextMenu={() => this.contextMenu(item)}
              />
            );
          })
        : null;
    const className = `sidebar__shortcuts ${
      isOpen ? 'sidebar__shortcuts--is-open' : ''
    }`;

    return (
      <div className={className}>
        <div className="shortcuts__title" onClick={this.onTitleClick}>
          <Icon
            className="shortcuts__icon shortcuts__icon--chevron"
            path={chevronIcon}
          />
          <span className="shortcuts__text">{title}</span>
          <Icon
            onClick={this.onNewClick}
            className="shortcuts__icon shortcuts__icon--new"
            path={plusIcon}
          />
        </div>

        {isOpen && (
          <div className="shortcuts__list">
            {listContent || (
              <span className="shortcuts__empty">{emptyLabel}</span>
            )}
          </div>
        )}
      </div>
    );
  }
}

export default withRouter(connect(null)(ShortcutList));
