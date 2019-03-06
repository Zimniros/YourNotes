import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { func } from 'prop-types';

import Icon from '@mdi/react';
import { mdiFolderOutline as folderIcon } from '@mdi/js';

import { folderType, notesDataType, locationType } from '../../types';

import getNotes from '../lib/getNotes';
import getNotesAmount from '../lib/getNotesAmount';

const FolderItem = ({
  folder, handleFolderContextMenu, notesData, location,
}) => {
  const pathnameTo = `/folder/${folder.id}`;
  const notes = getNotes(pathnameTo, notesData);
  const notesCount = getNotesAmount(notes);
  const { pathname: currentPathname } = location;
  const isActive = currentPathname === pathnameTo;

  const className = `shortcuts__shortcut${isActive ? ' shortcuts__shortcut--active' : ''}`;

  return (
    <Link to={pathnameTo} className={className} onContextMenu={() => handleFolderContextMenu(folder)}>
      <Icon className="shortcut__icon" path={folderIcon} />
      <span title={folder.name} className="shortcut__name">
        {folder.name}
      </span>
      <span className="shortcut__notes-count">{notesCount}</span>
    </Link>
  );
};

const mapStateToProps = state => ({ notesData: state.notesData });

export default connect(mapStateToProps)(FolderItem);

FolderItem.propTypes = {
  location: locationType.isRequired,
  handleFolderContextMenu: func.isRequired,
  folder: folderType.isRequired,
  notesData: notesDataType.isRequired,
};
