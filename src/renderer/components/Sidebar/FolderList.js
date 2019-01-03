import React, { Component } from 'react';

import Icon from 'react-icons-kit';
import { chevronRight } from 'react-icons-kit/fa/chevronRight';
import { plus } from 'react-icons-kit/fa/plus';

// Mock data
// TODO: Replace with actual data
const MOCK_FOLDERS = ['My folder', 'Not my folder', 'folder7', 'folder654'];

class FolderList extends Component {
  state = {
    isOpen: false,
    folders: MOCK_FOLDERS,
  };

  onChevronClick = (event) => {
    event.preventDefault();
    const { isOpen } = this.state;

    this.setState({ isOpen: !isOpen });
  };

  onNewClick = (event) => {
    event.preventDefault();

    console.log('add later');
  };

  render() {
    const { isOpen, folders } = this.state;
    const folderList = folders.map(folder => <div className="folder__item">{folder}</div>);
    const className = `sidebar__folder-list ${isOpen ? 'sidebar__folder-list--is-open' : ''}`;

    return (
      <div className={className}>
        <div className="folder-list__title">
          <Icon
            onClick={event => this.onChevronClick(event)}
            className="folder-list__icon folder-list__icon--chevron"
            size="100%"
            icon={chevronRight}
          />
          <span className="folder-list__text">Folders</span>
          <Icon
            onClick={event => this.onNewClick(event)}
            className="folder-list__icon folder-list__icon--new"
            size="100%"
            icon={plus}
          />
        </div>
        {isOpen ? folderList : null}
      </div>
    );
  }
}

export default FolderList;