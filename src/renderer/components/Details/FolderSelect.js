/* eslint-disable no-unused-expressions */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { func, instanceOf } from 'prop-types';
import Icon from '@mdi/react';
import { mdiNotebook as notebookIcon, mdiFolder as folderIcon } from '@mdi/js';

import { updateNote } from '../../actions';
import updateNoteApi from '../../../lib/updateNote';
import { noteType, historyType } from '../../types';

import Map from '../../../lib/Map';

class FolderSelect extends Component {
  static propTypes = {
    note: noteType.isRequired,
    dispatch: func.isRequired,
    folders: instanceOf(Map).isRequired,
    history: historyType.isRequired,
  };

  constructor() {
    super();

    this.state = {
      isOpen: false,
    };

    this.dropdownRef = React.createRef();

    this.onFolderSelectClick = this.onFolderSelectClick.bind(this);
    this.onClose = this.onClose.bind(this);
    this.handleOutsideClick = this.handleOutsideClick.bind(this);
  }

  onFolderSelectClick() {
    const { isOpen } = this.state;
    !isOpen ? this.addListener() : this.removeListener();

    this.setState({ isOpen: !isOpen });
  }

  onClose() {
    this.setState({ isOpen: false });
    this.removeListener();
  }

  onFolderItemClick(newFolderId) {
    const { note, dispatch, history } = this.props;

    const pathname = newFolderId ? `/folder/${newFolderId}` : '/home';

    const newNote = Object.assign({}, note, { folder: newFolderId || '' });

    updateNoteApi(newNote)
      .then(data => dispatch(updateNote(data)))
      .then(() => {
        this.onClose();
        history.replace(pathname);
      })
      .catch(error => console.log('Error in onFolderItemClick() in FolderSelect component', error));
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
    const { folders, note } = this.props;
    const { folder: folderId } = note;
    const { isOpen } = this.state;
    const folder = folders.get(folderId);

    const folderName = folder ? folder.name : 'All Notes';

    return (
      <div className="storage-info__folder-select folder-select" onClick={this.onFolderSelectClick}>
        <Icon className="folder-select__icon" path={folderIcon} />
        <span className="folder-select__name">{folderName}</span>

        {isOpen && (
          <div onClick={e => e.stopPropagation()} ref={this.dropdownRef} className="folder-select__dropdown">
            <div
              key={0}
              className={`folder-select__item${!folder ? ' folder-select__item--selected' : ''}`}
              onClick={() => this.onFolderItemClick()}
            >
              <Icon className="folder-select__item-icon" path={notebookIcon} />
              <span className="folder-select__item-name">All Notes</span>
            </div>
            {folders.map(({ id, name }) => {
              const className = `folder-select__item${folderId === id ? ' folder-select__item--selected' : ''} `;

              return (
                <div key={id} className={className} onClick={() => this.onFolderItemClick(id)}>
                  <Icon className="folder-select__item-icon" path={folderIcon} />
                  <span className="folder-select__item-name">{name}</span>
                </div>
              );
            })}
          </div>
        )}
      </div>
    );
  }
}

const mapStateToProps = state => ({ folders: state.folders });

export default withRouter(connect(mapStateToProps)(FolderSelect));
