/* eslint-disable max-len */
/* eslint-disable react/destructuring-assignment */
import React, { Component } from 'react';
import { arrayOf, func } from 'prop-types';
import { connect } from 'react-redux';
import { isArray, isEmpty } from 'lodash';

import Icon from '@mdi/react';
import { mdiChevronRight as chevron, mdiPlus as plus } from '@mdi/js';

import FolderItem from './FolderItem';
import { showModal } from '../../actions';
import { folderType } from '../../types';

class FolderList extends Component {
  state = {
    isOpen: false,
  };

  static propTypes = {
    folders: arrayOf(folderType).isRequired,
    dispatch: func.isRequired,
    onItemClick: func.isRequired,
  };

  onChevronClick(event) {
    event.preventDefault();
    const { isOpen } = this.state;

    this.setState({ isOpen: !isOpen });
  }

  onNewClick(event) {
    event.preventDefault();

    this.props.dispatch(showModal());
  }

  render() {
    const { isOpen } = this.state;
    const { folders, onItemClick } = this.props;
    const folderList = isArray(folders) && !isEmpty(folders)
      ? folders.map(folder => <FolderItem key={folder.id} folder={folder} onClick={onItemClick} />)
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

const mapStateToProps = state => ({ folders: state.folders.folders });

export default connect(mapStateToProps)(FolderList);
