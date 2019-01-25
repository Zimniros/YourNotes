import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { func } from 'prop-types';

import Icon from '@mdi/react';

import { sidebarShortcuts } from '../lib/consts';
import { setLocationName } from '../../actions';
import FolderList from './FolderList';

class Sidebar extends Component {
  static propTypes = {
    dispatch: func.isRequired,
  };

  constructor() {
    super();

    this.onShortcutClick = this.onShortcutClick.bind(this);
  }

  onShortcutClick(locationName) {
    const { dispatch } = this.props;
    dispatch(setLocationName(locationName));
  }

  renderSidebarNav() {
    return sidebarShortcuts.map(el => (
      <Link key={el.route} to={el.route} className="menu__item" onClick={() => this.onShortcutClick(el.name)}>
        <Icon className="menu__icon" path={el.icon} />
        <span className="menu__text">{el.name}</span>
        <span className="menu__count">0</span>
      </Link>
    ));
  }

  render() {
    return (
      <div className="sidebar">
        <div className="sidebar__menu">{this.renderSidebarNav()}</div>

        <FolderList onItemClick={this.onShortcutClick} />

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
  }
}

export default connect(null)(Sidebar);
