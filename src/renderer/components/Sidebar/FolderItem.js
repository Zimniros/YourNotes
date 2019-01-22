import React from 'react';

import Icon from '@mdi/react';
import { mdiFolderOutline as folderIcon } from '@mdi/js';

import { folderType } from '../../types';

const FolderItem = ({ folder }) => (
  <div className="folder-list__folder">
    <Icon className="folder__icon" path={folderIcon} />
    <span className="folder__name">{folder.name}</span>
  </div>
);

export default FolderItem;

FolderItem.propTypes = {
  folder: folderType.isRequired,
};
