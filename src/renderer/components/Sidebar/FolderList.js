/* eslint-disable max-len */
/* eslint-disable react/destructuring-assignment */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { isArray, isEmpty } from 'lodash';

import Icon from 'react-icons-kit';
import { chevronRight } from 'react-icons-kit/fa/chevronRight';
import { plus } from 'react-icons-kit/fa/plus';

import { showModal, getFolders } from '../../actions';
import { folderType } from '../../types';

class FolderList extends Component {
  state = {
    isOpen: false,
  };

  static propTypes = {
    folders: PropTypes.arrayOf(folderType).isRequired,
    dispatch: PropTypes.func.isRequired,
  };

  componentDidMount() {
    this.props.dispatch(getFolders());
  }

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
        <div key={folder.id} className="folder__item">
          {folder.name}
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

const mapStateToProps = state => ({ folders: state.folders });

export default connect(mapStateToProps)(FolderList);
