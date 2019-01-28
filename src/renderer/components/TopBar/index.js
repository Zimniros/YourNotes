/* eslint-disable react/prop-types */
/* eslint-disable react/destructuring-assignment */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import Icon from '@mdi/react';
import { mdiFilePlus as newNote, mdiSortDescending as sort } from '@mdi/js';

import SearchBar from './SearchBar';
import addNote from '../../../lib/addNote';
import { folderType, folderDefault } from '../../types';
import { sidebarShortcuts } from '../lib/consts';

class TopBar extends Component {
  static propTypes = {
    selectedFolder: folderType,
  };

  static defaultProps = {
    selectedFolder: folderDefault,
  };

  onNewNoteClick() {
    addNote()
      .then((data) => {
        this.props.history.push({
          pathname: this.props.location.pathname,
          search: `?key=${data}`,
        });
      })
      .catch(err => console.log('err', err));
  }

  setLocation() {
    const { selectedFolder, location } = this.props;
    const { pathname } = location;
    let locationName;

    if (selectedFolder) {
      locationName = selectedFolder.name ? selectedFolder.name : '';
    } else {
      const routeObj = sidebarShortcuts.find(({ route }) => route === pathname);
      locationName = routeObj ? routeObj.name : '';
    }

    return locationName;
  }

  render() {
    const name = this.setLocation();
    return (
      <div className="top-bar">
        <div className="top-bar__row">
          <Icon className="top-bar__icon" path={sort} />
          <div title={name} className="top-bar__location-name">
            {name}
          </div>
          <Icon className="top-bar__icon" path={newNote} onClick={() => this.onNewNoteClick()} />
        </div>
        <SearchBar />
      </div>
    );
  }
}

const mapStateToProps = state => ({ selectedFolder: state.folders.selectedFolder });

export default withRouter(connect(mapStateToProps)(TopBar));
