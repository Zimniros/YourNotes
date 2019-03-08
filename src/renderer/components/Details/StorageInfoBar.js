/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { func, instanceOf } from 'prop-types';
import Icon from '@mdi/react';
import { mdiFolder as folderIcon } from '@mdi/js';

import { updateNote } from '../../actions';
import updateNoteApi from '../../../lib/updateNote';
import Map from '../../../lib/Map';

import FolderSelect from './FolderSelect';
import { noteType } from '../../types';

class StorageInfoBar extends Component {
  static propTypes = {
    note: noteType.isRequired,
    folders: instanceOf(Map).isRequired,
    dispatch: func.isRequired,
  };

  constructor() {
    super();

    this.state = {
      isFolderSelectOpen: false,
    };

    this.onClose = this.onClose.bind(this);
    this.onFolderItemClick = this.onFolderItemClick.bind(this);
  }

  onFolderSelectClick() {
    const { isFolderSelectOpen } = this.state;
    this.setState({ isFolderSelectOpen: !isFolderSelectOpen });
  }

  onClose() {
    this.setState({ isFolderSelectOpen: false });
  }

  onFolderItemClick(newFolderId) {
    const { note, dispatch } = this.props;

    const newNote = Object.assign({}, note, { folder: newFolderId });

    updateNoteApi(newNote)
      .then(data => dispatch(updateNote(data)))
      .catch(error => console.log('Error in onFolderItemClick() in StorageInfoBar component', error));
  }

  render() {
    const { isFolderSelectOpen } = this.state;
    const { folders, note } = this.props;
    const { folder: folderId } = note;

    const folder = folders.get(folderId);
    const folderName = folder ? folder.name : 'All Notes';

    const isSelectOpen = isFolderSelectOpen && folders && !!folders.size;

    return (
      <div className="title-bar__storage-info storage-info">
        <div className="storage-info__folder" onClick={() => this.onFolderSelectClick()}>
          <Icon className="storage-info__icon" path={folderIcon} />
          <span className="storage-info__name">{folderName}</span>

          {isSelectOpen && (
            <FolderSelect onFolderItemClick={this.onFolderItemClick} onClose={this.onClose} folders={folders} />
          )}
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({ folders: state.folders });

export default connect(mapStateToProps)(StorageInfoBar);
