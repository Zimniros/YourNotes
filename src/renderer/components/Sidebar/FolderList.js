/* eslint-disable max-len */
/* eslint-disable react/destructuring-assignment */
import React, { Component } from 'react';
import { func, instanceOf } from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import Icon from '@mdi/react';
import { mdiChevronRight as chevron, mdiPlus as plus } from '@mdi/js';

import FolderItem from './FolderItem';
import { showModal } from '../../actions';
import Map from '../../../lib/Map';
import { locationType } from '../../types';

class FolderList extends Component {
  state = {
    isOpen: false,
  };

  static propTypes = {
    location: locationType.isRequired,
    folders: instanceOf(Map).isRequired,
    dispatch: func.isRequired,
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
    const { folders, location } = this.props;

    const folderList = folders && folders.size
      ? folders.map(folder => <FolderItem key={folder.id} folder={folder} location={location} />)
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
