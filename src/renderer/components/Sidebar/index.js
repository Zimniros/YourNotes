import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import Icon from '@mdi/react';

import { sidebarShortcuts } from '../lib/consts';
import FolderList from './FolderList';
import TagList from './TagList';

import getNotes from '../lib/getNotes';
import getNotesAmount from '../lib/getNotesAmount';
import { notesDataType, locationType } from '../../types';

const Sidebar = ({ notesData, location }) => {
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

      <FolderList />

      <TagList />
    </div>
  );
};

const mapStateToProps = state => ({ notesData: state.notesData });

export default withRouter(connect(mapStateToProps)(Sidebar));

Sidebar.propTypes = {
  location: locationType.isRequired,
  notesData: notesDataType.isRequired,
};
