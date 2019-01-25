import React from 'react';
import { Link } from 'react-router-dom';
import { func } from 'prop-types';

import Icon from '@mdi/react';
import { mdiFolderOutline as folderIcon } from '@mdi/js';

import { folderType } from '../../types';

const FolderItem = ({ folder, onClick }) => (
  <Link to={`/folder/${folder.id}`} className="folder-list__folder" onClick={() => onClick(folder.name)}>
    <Icon className="folder__icon" path={folderIcon} />
    <span title={folder.name} className="folder__name">
      {folder.name}
    </span>
  </Link>
);

export default FolderItem;

FolderItem.propTypes = {
  folder: folderType.isRequired,
  onClick: func.isRequired,
};
