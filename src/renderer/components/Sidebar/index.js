import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import Icon from '@mdi/react';

import { sidebarShortcuts } from '../lib/consts';
import FolderList from './FolderList';
import getNotesAmount from '../lib/getNotesAmount';
import { notesDataType } from '../../types';

const Sidebar = ({ notesData }) => {
  const shortcuts = sidebarShortcuts.map(el => (
    <Link key={el.route} to={el.route} className="menu__item">
      <Icon className="menu__icon" path={el.icon} />
      <span className="menu__text">{el.name}</span>
      <span className="menu__count">{getNotesAmount(el.route, notesData)}</span>
    </Link>
  ));

  return (
    <div className="sidebar">
      <div className="sidebar__menu">{shortcuts}</div>

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

const mapStateToProps = state => ({ notesData: state.notesData });

export default connect(mapStateToProps)(Sidebar);

Sidebar.propTypes = {
  notesData: notesDataType.isRequired,
};
