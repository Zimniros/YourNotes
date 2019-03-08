import React from 'react';
import { Link } from 'react-router-dom';
import { string, func, oneOfType } from 'prop-types';

import { tagType, folderType } from '../../types';

const ShortcutItem = ({
  item, pathTo, notesAmount, onItemContextMenu,
}) => (
  <Link to={pathTo} className="shortcuts__shortcut" onContextMenu={() => onItemContextMenu(item)}>
    <span title={item.name} className="shortcut__name">
      {item.name}
    </span>
    <span className="shortcut__notes-count">{notesAmount}</span>
  </Link>
);
export default ShortcutItem;

ShortcutItem.propTypes = {
  item: oneOfType([tagType, folderType]).isRequired,
  pathTo: string.isRequired,
  notesAmount: string.isRequired,
  onItemContextMenu: func.isRequired,
};
