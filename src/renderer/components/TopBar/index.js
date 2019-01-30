/* eslint-disable react/no-unused-state */
/* eslint-disable react/no-unused-prop-types */
/* eslint-disable react/prop-types */
/* eslint-disable react/destructuring-assignment */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import Icon from '@mdi/react';
import { mdiFilePlus as newNote, mdiSortDescending as sort } from '@mdi/js';

import SearchBar from './SearchBar';
import addNoteApi from '../../../lib/addNote';
import { folderType, folderDefault } from '../../types';
import { folderPathnameRegex, sidebarShortcuts } from '../lib/consts';
import { addNote } from '../../actions';

class TopBar extends Component {
  static propTypes = {
    selectedFolder: folderType,
  };

  static defaultProps = {
    selectedFolder: folderDefault,
  };

  state = {
    locationName: '',
    folderId: '',
  };

  componentDidMount() {
    this.setLocation();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.location.pathname !== this.props.location.pathname) {
      this.setLocation();
    }
  }

  onNewNoteClick() {
    const { location, history, dispatch } = this.props;
    const { folderId } = this.state;

    addNoteApi(folderId)
      .then((note) => {
        dispatch(addNote(note));

        history.push({
          pathname: location.pathname,
          search: `?key=${note.key}`,
        });
      })
      .catch(err => console.log('err', err));
  }

  setLocation() {
    const { location, folders } = this.props;
    const { pathname } = location;

    const match = pathname.match(folderPathnameRegex);

    if (match) {
      const { name, id } = folders.get(match[1]);

      this.setState({ locationName: name, folderId: id });
    } else {
      const routeObj = sidebarShortcuts.find(({ route }) => route === pathname);
      const locationName = routeObj ? routeObj.name : '';
      this.setState({ locationName, folderId: '' });
    }
  }

  render() {
    const { locationName } = this.state;
    return (
      <div className="top-bar">
        <div className="top-bar__row">
          <Icon className="top-bar__icon" path={sort} />
          <div title={locationName} className="top-bar__location-name">
            {locationName}
          </div>
          <Icon className="top-bar__icon" path={newNote} onClick={() => this.onNewNoteClick()} />
        </div>
        <SearchBar />
      </div>
    );
  }
}

const mapStateToProps = state => ({ folders: state.folders });

export default withRouter(connect(mapStateToProps)(TopBar));
