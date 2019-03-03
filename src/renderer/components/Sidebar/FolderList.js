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
import { showAddFolderModal } from '../../actions';
import { locationType } from '../../types';

class FolderList extends Component {
  static propTypes = {
    location: locationType.isRequired,
    folders: instanceOf(Map).isRequired,
    dispatch: func.isRequired,
  };

  constructor() {
    super();

    this.state = {
      isOpen: false,
    };

    this.handleFolderContextMenu = this.handleFolderContextMenu.bind(this);
  }

  onChevronClick(event) {
    event.preventDefault();
    const { isOpen } = this.state;

    this.setState({ isOpen: !isOpen });
  }

  onNewClick(event) {
    event.preventDefault();
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
        click: () => console.log(renameFolderLabel, folder),
      },
      {
        label: deleteFolderLabel,
        click: () => console.log(deleteFolderLabel, folder),
      },
    );

    context.popup(templates);
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
        <div className="folder-list__title">
          <Icon
            onClick={event => this.onChevronClick(event)}
            className="folder-list__icon folder-list__icon--chevron"
            path={chevron}
          />
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
