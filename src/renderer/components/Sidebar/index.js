import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { func } from 'prop-types';

import Icon from '@mdi/react';

import { sidebarShortcuts } from '../lib/consts';
import { setLocationName } from '../../actions';
import FolderList from './FolderList';

const Sidebar = ({ dispatch }) => {
  const sidebarNav = sidebarShortcuts.map(el => (
    <Link to={el.route} className="menu__item" onClick={() => dispatch(setLocationName(el.name))}>
      <Icon className="menu__icon" path={el.icon} />
      <span className="menu__text">{el.name}</span>
      <span className="menu__count">0</span>
    </Link>
  ));

  return (
    <div className="sidebar">
      <div className="sidebar__menu">{sidebarNav}</div>

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
};

export default connect(null)(Sidebar);

Sidebar.propTypes = {
  dispatch: func.isRequired,
};
