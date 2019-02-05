import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import Icon from '@mdi/react';
import { mdiFolderOutline as folderIcon } from '@mdi/js';

import { folderType, notesDataType } from '../../types';

import getNotesAmount from '../lib/getNotesAmount';

const FolderItem = ({ folder, notesData }) => {
  const pathname = `/folder/${folder.id}`;
  const notesCount = getNotesAmount(pathname, notesData);

  return (
    <Link to={pathname} className="folder-list__folder">
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
  folder: folderType.isRequired,
  notesData: notesDataType.isRequired,
};
