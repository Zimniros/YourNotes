import React from 'react';
import { Link } from 'react-router-dom';
import { func } from 'prop-types';

import Icon from '@mdi/react';
import { mdiTagOutline as tagIcon } from '@mdi/js';

import { tagType } from '../../types';

const TagItem = ({ tag, handleFolderContextMenu }) => (
  <Link to="/" className="shortcuts__shortcut" onContextMenu={() => handleFolderContextMenu(tag)}>
    <Icon className="shortcut__icon" path={tagIcon} />
    <span title={tag.name} className="shortcut__name">
      {tag.name}
    </span>
    <span className="shortcut__notes-count">0</span>
  </Link>
);
export default TagItem;

TagItem.propTypes = {
  tag: tagType.isRequired,
  handleFolderContextMenu: func.isRequired,
};
