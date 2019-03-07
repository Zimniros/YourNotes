/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { Component } from 'react';
import { func, instanceOf } from 'prop-types';
import Icon from '@mdi/react';
import { mdiFolder as folderIcon } from '@mdi/js';

import Map from '../../../lib/Map';

class FolderSelect extends Component {
  static propTypes = {
    onClose: func.isRequired,
    onFolderItemClick: func.isRequired,
    folders: instanceOf(Map).isRequired,
  };

  constructor() {
    super();

    this.selectRef = React.createRef();

    this.handleOutsideClick = this.handleOutsideClick.bind(this);
  }

  componentDidMount() {
    document.addEventListener('click', this.handleOutsideClick);
  }

  componentWillUnmount() {
    document.removeEventListener('click', this.handleOutsideClick);
  }

  handleOutsideClick(event) {
    const { onClose } = this.props;

    if (!this.selectRef.current.contains(event.target)) {
      onClose();
    }
  }

  render() {
    const { folders, onFolderItemClick } = this.props;

    const folderList = folders
      && folders.size
      && folders.map(({ id, name }) => (
        <div key={id} className="folder-select__item" onClick={() => onFolderItemClick(id)}>
          <Icon className="folder-select__icon" path={folderIcon} />
          <span className="folder-select__name">{name}</span>
        </div>
      ));

    return folderList ? (
      <div onClick={e => e.stopPropagation()} ref={this.selectRef} className="folder-select">
        {folderList}
      </div>
    ) : null;
  }
}

export default FolderSelect;
