/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { string, instanceOf } from 'prop-types';
import Icon from '@mdi/react';
import { mdiFolder as folderIcon } from '@mdi/js';

import FolderSelect from './FolderSelect';

import Map from '../../../lib/Map';

class StorageInfoBar extends Component {
  static propTypes = {
    folderId: string.isRequired,
    folders: instanceOf(Map).isRequired,
  };

  constructor() {
    super();

    this.state = {
      isFolderSelectOpen: false,
    };

    this.onClose = this.onClose.bind(this);
    this.getFolderParentSelector = this.getFolderParentSelector.bind(this);
  }

  onFolderClick() {
    const { isFolderSelectOpen } = this.state;
    this.setState({ isFolderSelectOpen: !isFolderSelectOpen });
  }

  onClose() {
    this.setState({ isFolderSelectOpen: false });
  }

  getFolderParentSelector() {
    return this.folderInfoRef.current;
  }

  render() {
    const { isFolderSelectOpen } = this.state;
    const { folders, folderId } = this.props;

    const folder = folders.get(folderId);
    const folderName = folder ? folder.name : 'All Notes';

    return (
      <div className="title-bar__storage-info storage-info">
        <div className="storage-info__folder" onClick={() => this.onFolderClick()}>
          <Icon className="storage-info__icon" path={folderIcon} />
          <span className="storage-info__name">{folderName}</span>

          {isFolderSelectOpen && <FolderSelect onClose={this.onClose} folders={folders} />}
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({ folders: state.folders });

export default connect(mapStateToProps)(StorageInfoBar);
