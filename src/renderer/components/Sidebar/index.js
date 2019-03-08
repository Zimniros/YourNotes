import React from 'react';
import { Link } from 'react-router-dom';
import { instanceOf } from 'prop-types';

import Icon from '@mdi/react';

import { sidebarShortcuts } from '../lib/consts';
import ShortcutList from './ShortcutList';

import getNotes from '../lib/getNotes';
import getNotesAmount from '../lib/getNotesAmount';
import { notesDataType, locationType } from '../../types';
import Map from '../../../lib/Map';

const Sidebar = ({
  notesData, location, tags, folders,
}) => {
  const shortcuts = sidebarShortcuts.map((el) => {
    const { pathname } = location;
    const isActive = pathname === el.route;
    const notes = getNotes(el.route, notesData);
    const notesAmount = getNotesAmount(notes);

    const className = `menu__item${isActive ? ' menu__item--active' : ''}`;

    return (
      <Link key={el.route} to={el.route} className={className}>
        <Icon className="menu__icon" path={el.icon} />
        <span className="menu__text">{el.name}</span>
        <span className="menu__count">{notesAmount}</span>
      </Link>
    );
  });

  return (
    <div className="sidebar">
      <div className="sidebar__menu">{shortcuts}</div>

      <ShortcutList list={folders} title="Folders" listType="folderList" notesData={notesData} />

      <ShortcutList list={tags} title="Tags" listType="tagList" notesData={notesData} />
    </div>
  );
};

export default Sidebar;

Sidebar.propTypes = {
  location: locationType.isRequired,
  notesData: notesDataType.isRequired,
  tags: instanceOf(Map).isRequired,
  folders: instanceOf(Map).isRequired,
};
