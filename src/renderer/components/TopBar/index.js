import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { instanceOf, func } from 'prop-types';

import Icon from '@mdi/react';
import {
  mdiFilePlus as newNoteIcon,
  mdiSortDescending as sortIcon,
  mdiFolderOutline as folderIcon,
  mdiTagOutline as tagIcon,
} from '@mdi/js';

import SearchBar from './SearchBar';
import addNoteApi from '../../../lib/addNote';
import Map from '../../../lib/Map';

import { folderPathnameRegex, tagPathnameRegex, sidebarShortcuts } from '../lib/consts';
import { addNote } from '../../actions';
import { historyType, locationType } from '../../types';

class TopBar extends Component {
  static propTypes = {
    tags: instanceOf(Map).isRequired,
    folders: instanceOf(Map).isRequired,
    history: historyType.isRequired,
    location: locationType.isRequired,
    dispatch: func.isRequired,
  };

  constructor() {
    super();

    this.state = {
      type: '',
      locationName: '',
      locationId: '',
    };

    this.newNoteButtonRef = React.createRef();
  }

  componentDidMount() {
    this.setLocation();
  }

  componentDidUpdate(prevProps) {
    const { location } = this.props;
    const { pathname } = location;

    if (prevProps.location.pathname !== pathname) {
      this.setLocation();
    }
  }

  onNewNoteClick() {
    const { location, history, dispatch } = this.props;
    const { type, locationId } = this.state;

    const newNoteButton = this.newNoteButtonRef.current;
    newNoteButton.setAttribute('disabled', 'disabled');

    addNoteApi(type, locationId)
      .then((note) => {
        dispatch(addNote(note));

        history.push({
          pathname: location.pathname,
          search: `?key=${note.key}`,
        });

        newNoteButton.removeAttribute('disabled');
      })
      .catch((err) => {
        console.log('err', err);
        newNoteButton.removeAttribute('disabled');
      });
  }

  setLocation() {
    const { location, folders, tags } = this.props;
    const { pathname } = location;

    const folderMatch = pathname.match(folderPathnameRegex);

    const tagMatch = pathname.match(tagPathnameRegex);

    if (folderMatch) {
      const { name, id } = folders.get(folderMatch[1]);

      return this.setState({ type: 'folder', locationName: name, locationId: id });
    }

    if (tagMatch) {
      const { name, id } = tags.get(tagMatch[1]);

      return this.setState({ type: 'tag', locationName: name, locationId: id });
    }

    const routeObj = sidebarShortcuts.find(({ route }) => route === pathname);
    const locationName = routeObj ? routeObj.name : '';
    return this.setState({ type: '', locationName, locationId: '' });
  }

  render() {
    const { type, locationName } = this.state;
    let locationIcon;

    if (type === 'folder') locationIcon = folderIcon;

    if (type === 'tag') locationIcon = tagIcon;

    return (
      <div className="top-bar">
        <div className="top-bar__row">
          <Icon className="top-bar__icon" path={sortIcon} />
          <div title={locationName} className="top-bar__location">
            {locationIcon && <Icon className="top-bar__location-icon" path={locationIcon} />}
            <span className="top-bar__location-name">{locationName}</span>
          </div>

          <button
            className="top-bar__button"
            ref={this.newNoteButtonRef}
            type="button"
            onClick={() => this.onNewNoteClick()}
          >
            <Icon className="top-bar__icon" path={newNoteIcon} />
          </button>
        </div>
        <SearchBar />
      </div>
    );
  }
}

const mapStateToProps = state => ({ folders: state.folders, tags: state.tags });

export default withRouter(connect(mapStateToProps)(TopBar));
