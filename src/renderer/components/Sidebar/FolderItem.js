import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import Icon from '@mdi/react';
import { mdiFolderOutline as folderIcon } from '@mdi/js';

import { folderType, notesDataType, locationType } from '../../types';

import getNotesAmount from '../lib/getNotesAmount';

const FolderItem = ({ folder, notesData, location }) => {
  const pathnameTo = `/folder/${folder.id}`;
  const notesCount = getNotesAmount(pathnameTo, notesData);
  const { pathname: currentPathname } = location;
  const isActive = currentPathname === pathnameTo;

  const className = `folder-list__folder${isActive ? ' folder-list__folder--active' : ''}`;

  return (
    <Link to={pathnameTo} className={className}>
      <Icon className="folder__icon" path={folderIcon} />
      <span title={folder.name} className="folder__name">
        {folder.name}
      </span>
      <span className="folder__notes-count">{notesCount}</span>
    </Link>
  );
};

const mapStateToProps = state => ({ notesData: state.notesData });

export default connect(mapStateToProps)(FolderItem);

FolderItem.propTypes = {
  location: locationType.isRequired,
  folder: folderType.isRequired,
  notesData: notesDataType.isRequired,
};
