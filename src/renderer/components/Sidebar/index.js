import React from 'react';
import { Link } from 'react-router-dom';

import Icon from '@mdi/react';
import { mdiNotebook as notebook, mdiStarOutline as star, mdiTrashCanOutline as trash } from '@mdi/js';

import FolderList from './FolderList';

const Sidebar = () => (
  <div className="sidebar">
    <div className="sidebar__menu">
      <Link to="home" className="menu__item">
        <Icon className="menu__icon" path={notebook} />
        <span className="menu__text">All Notes</span>
        <span className="menu__count">0</span>
      </Link>
      <Link to="starred" className="menu__item">
        <Icon className="menu__icon" path={star} />
        <span className="menu__text">Starred</span>
        <span className="menu__count">0</span>
      </Link>
      <Link to="trashed" className="menu__item">
        <Icon className="menu__icon" path={trash} />
        <span className="menu__text">Trash</span>
        <span className="menu__count">0</span>
      </Link>
    </div>

    <FolderList />

    <div className="sidebar__tag-shortcuts">
      <div className="tag-shortcuts__title">Tags</div>
      <ul className="tag-shortcuts__list">
        <li className="tag-shortcuts__item">Tag 1</li>
        <li className="tag-shortcuts__item">Tag 2</li>
        <li className="tag-shortcuts__item">Tag 3</li>
      </ul>
    </div>
  </div>
);

export default Sidebar;
