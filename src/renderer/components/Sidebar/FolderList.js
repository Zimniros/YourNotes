/* eslint-disable max-len */
/* eslint-disable react/destructuring-assignment */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { isArray, isEmpty } from 'lodash';

import Icon from '@mdi/react';
import { mdiChevronRight as chevron, mdiPlus as plus, mdiFolderOutline as folderIcon } from '@mdi/js';

import { showModal } from '../../actions';
import { folderType } from '../../types';

class FolderList extends Component {
  state = {
    isOpen: false,
  };

  static propTypes = {
    folders: PropTypes.arrayOf(folderType).isRequired,
    dispatch: PropTypes.func.isRequired,
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
    const { folders } = this.props;
    const folderList = isArray(folders) && !isEmpty(folders)
      ? folders.map(folder => (
        <div key={folder.id} className="folder-list__item">
          <Icon className="item__icon" path={folderIcon} />
          <span className="item__name">{folder.name}</span>
        </div>
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

export default connect(mapStateToProps)(FolderList);
