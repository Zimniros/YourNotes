/* eslint-disable no-unused-expressions */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { instanceOf, func } from 'prop-types';

import Icon from '@mdi/react';
import {
  mdiFilePlus as newNoteIcon,
  mdiSortVariant as sortIcon,
  mdiFolderOutline as folderIcon,
  mdiTagOutline as tagIcon
} from '@mdi/js';

import Map from '../../api/Map';
import { addNote, setSortBy } from '../../actions';
import {
  folderPathnameRegex,
  tagPathnameRegex,
  sidebarShortcuts
} from '../lib/consts';
import { historyType, locationType as locationPropType } from '../../types';

import SearchBar from './SearchBar';

const SORT_BY = {
  UPDATED_AT_DESC: {
    label: 'Updated At(Desc)',
    sortBy: {
      sortField: 'UPDATED_AT',
      sortOrder: 'DESC'
    }
  },
  UPDATED_AT_ASC: {
    label: 'Updated At(Asc)',
    sortBy: {
      sortField: 'UPDATED_AT',
      sortOrder: 'ASC'
    }
  },
  CREATED_AT_DESC: {
    label: 'Created At(Desc)',
    sortBy: {
      sortField: 'CREATED_AT',
      sortOrder: 'DESC'
    }
  },
  CREATED_AT_ASC: {
    label: 'Created At(Asc)',
    sortBy: {
      sortField: 'CREATED_AT',
      sortOrder: 'ASC'
    }
  },
  ALPHABETICAL_DESC: {
    label: 'Alphabetical(Desc)',
    sortBy: {
      sortField: 'ALPHABETICAL',
      sortOrder: 'DESC'
    }
  },
  ALPHABETICAL_ASC: {
    label: 'Alphabetical(Asc)',
    sortBy: {
      sortField: 'ALPHABETICAL',
      sortOrder: 'ASC'
    }
  }
};

class TopBar extends Component {
  static propTypes = {
    tags: instanceOf(Map).isRequired,
    folders: instanceOf(Map).isRequired,
    history: historyType.isRequired,
    location: locationPropType.isRequired,
    dispatch: func.isRequired
  };

  constructor() {
    super();

    this.state = {
      locationType: '',
      locationName: '',
      locationId: '',
      isSortByOpen: false
    };

    this.newNoteButtonRef = React.createRef();
    this.dropdownRef = React.createRef();

    this.onSortByIconClick = this.onSortByIconClick.bind(this);
    this.onClose = this.onClose.bind(this);
    this.handleOutsideClick = this.handleOutsideClick.bind(this);
  }

  componentDidMount() {
    this.setLocation();
  }

  componentDidUpdate(prevProps) {
    const { location, tags, folders } = this.props;
    const { pathname } = location;

    if (prevProps.location.pathname !== pathname) {
      this.setLocation();
      return;
    }

    const folderMatch = pathname.match(folderPathnameRegex);
    const tagMatch = pathname.match(tagPathnameRegex);

    if (folderMatch) {
      const targetFolder = folders.get(folderMatch[1]);
      const prevFolder = prevProps.folders.get(folderMatch[1]);

      if (targetFolder && prevFolder && prevFolder.name !== targetFolder.name) {
        this.setLocation();
        return;
      }
    }

    if (tagMatch) {
      const targetTag = tags.get(tagMatch[1]);
      const prevTag = prevProps.tags.get(tagMatch[1]);

      if (targetTag && prevTag && prevTag.name !== targetTag.name) {
        this.setLocation();
      }
    }
  }

  onNewNoteClick() {
    const { location, history, dispatch } = this.props;
    const { locationType, locationId } = this.state;

    const newNoteButton = this.newNoteButtonRef.current;
    newNoteButton.setAttribute('disabled', 'disabled');

    dispatch(addNote({ locationType, locationId }))
      .then(note => {
        history.push({
          pathname: location.pathname,
          search: `?key=${note.key}`
        });

        newNoteButton.removeAttribute('disabled');
      })
      .catch(error => {
        console.error('Error in onNewNoteClick()', error);
        newNoteButton.removeAttribute('disabled');
      });
  }

  onSortByItemClick(sortBy) {
    const { dispatch } = this.props;

    dispatch(setSortBy(sortBy));
    this.onClose();
  }

  onSortByIconClick() {
    const { isSortByOpen } = this.state;
    !isSortByOpen ? this.addListener() : this.removeListener();

    this.setState({ isSortByOpen: !isSortByOpen });
  }

  onClose() {
    this.setState({ isSortByOpen: false });
    this.removeListener();
  }

  setLocation() {
    const { location, folders, tags } = this.props;
    const { pathname } = location;

    const folderMatch = pathname.match(folderPathnameRegex);

    const tagMatch = pathname.match(tagPathnameRegex);

    if (folderMatch) {
      const targetFolder = folders.get(folderMatch[1]);

      return (
        targetFolder &&
        this.setState({
          locationType: 'folder',
          locationName: targetFolder.name,
          locationId: targetFolder.id
        })
      );
    }

    if (tagMatch) {
      const targetTag = tags.get(tagMatch[1]);

      return (
        targetTag &&
        this.setState({
          locationType: 'tag',
          locationName: targetTag.name,
          locationId: targetTag.id
        })
      );
    }

    const routeObj = sidebarShortcuts.find(({ route }) => route === pathname);
    const locationName = routeObj ? routeObj.name : '';
    return this.setState({ locationType: '', locationName, locationId: '' });
  }

  addListener() {
    document.addEventListener('click', this.handleOutsideClick);
  }

  removeListener() {
    document.removeEventListener('click', this.handleOutsideClick);
  }

  handleOutsideClick(event) {
    if (!this.dropdownRef.current.contains(event.target)) {
      this.onClose();
    }
  }

  render() {
    const { locationType, locationName, isSortByOpen } = this.state;
    let locationIcon;

    if (locationType === 'folder') locationIcon = folderIcon;

    if (locationType === 'tag') locationIcon = tagIcon;

    const sortByList = Object.keys(SORT_BY).map(key => {
      const { label, sortBy } = SORT_BY[key];

      return (
        <div
          key={label}
          className="sort-by-dropdown__item"
          onClick={() => this.onSortByItemClick(sortBy)}
        >
          {label}
        </div>
      );
    });

    return (
      <div className="top-bar">
        <div className="top-bar__row">
          <div className="top-bar__sort-by">
            <Icon
              className="top-bar__icon"
              onClick={this.onSortByIconClick}
              path={sortIcon}
            />

            {isSortByOpen && (
              <div
                onClick={e => e.stopPropagation()}
                ref={this.dropdownRef}
                className="top-bar__sort-by-dropdown"
              >
                {sortByList}
              </div>
            )}
          </div>

          <div title={locationName} className="top-bar__location">
            {locationIcon && (
              <Icon className="top-bar__location-icon" path={locationIcon} />
            )}
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

export default withRouter(connect(null)(TopBar));
