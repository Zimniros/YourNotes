/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable class-methods-use-this */
import React, { Component } from 'react';
import { func, instanceOf } from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import Icon from '@mdi/react';
import { mdiChevronRight as chevron, mdiPlus as plus } from '@mdi/js';

import context from '../../../lib/context';
import Map from '../../../lib/Map';

import FolderItem from './FolderItem';
import { folderPathnameRegex } from '../lib/consts';
import { showAddFolderModal, showRenameFolderModal, showDeleteFolderConfirmationModal } from '../../actions';
import { locationType, historyType } from '../../types';

class FolderList extends Component {
  static propTypes = {
    location: locationType.isRequired,
    history: historyType.isRequired,
    folders: instanceOf(Map).isRequired,
    dispatch: func.isRequired,
  };

  constructor() {
    super();

    this.state = {
      isOpen: false,
    };

    this.handleDeleteFolder = this.handleDeleteFolder.bind(this);
    this.handleRenameFolder = this.handleRenameFolder.bind(this);
    this.handleFolderContextMenu = this.handleFolderContextMenu.bind(this);
  }

  componentDidUpdate() {
    const { location, history, folders } = this.props;
    const { pathname } = location;

    const match = pathname.match(folderPathnameRegex);

    if (match) {
      const folder = folders.get(match[1]);

      if (!folder) history.push('/home');
    }
  }

  onTitleClick(event) {
    event.preventDefault();
    const { isOpen } = this.state;

    this.setState({ isOpen: !isOpen });
  }

  onNewClick(event) {
    event.preventDefault();
    event.stopPropagation();

    const { dispatch } = this.props;

    dispatch(showAddFolderModal());
  }

  handleFolderContextMenu(folder) {
    const deleteFolderLabel = 'Delete folder';
    const renameFolderLabel = 'Rename folder';

    const templates = [];

    templates.push(
      {
        label: renameFolderLabel,
        click: () => this.handleRenameFolder(folder),
      },
      {
        label: deleteFolderLabel,
        click: () => this.handleDeleteFolder(folder),
      },
    );

    context.popup(templates);
  }

  handleDeleteFolder(folder) {
    const { dispatch } = this.props;

    dispatch(showDeleteFolderConfirmationModal(folder));
  }

  handleRenameFolder(folder) {
    const { dispatch } = this.props;

    dispatch(showRenameFolderModal(folder));
  }

  render() {
    const { isOpen } = this.state;
    const { folders, location } = this.props;

    const folderList = folders && folders.size
      ? folders.map(folder => (
        <FolderItem
          key={folder.id}
          folder={folder}
          location={location}
          handleFolderContextMenu={this.handleFolderContextMenu}
        />
      ))
      : null;
    const className = `sidebar__folder-list ${isOpen ? 'sidebar__folder-list--is-open' : ''}`;

    return (
      <div className={className}>
        <div className="folder-list__title" onClick={event => this.onTitleClick(event)}>
          <Icon className="folder-list__icon folder-list__icon--chevron" path={chevron} />
          <span className="folder-list__text">Folders</span>
          <Icon
            onClick={event => this.onNewClick(event)}
            className="folder-list__icon folder-list__icon--new"
            path={plus}
          />
        </div>
        {isOpen ? folderList : null}
      </div>
    );
  }
}

const mapStateToProps = state => ({ folders: state.folders });

export default withRouter(connect(mapStateToProps)(FolderList));
