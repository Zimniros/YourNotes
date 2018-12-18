import React from 'react';

const Sidebar = () => (
  <div className="sidebar">
    <div className="sidebar__main-shortcuts">
      <ul className="main-shortcuts__list">
        <li className="main-shortcuts__item">All Notes</li>
        <li className="main-shortcuts__item">Starred</li>
        <li className="main-shortcuts__item">Trash</li>
      </ul>
    </div>
    <div className="sidebar__folder-shortcuts">
      <div className="folder-shortcuts__title">Folders</div>
      <ul className="folder-shortcuts__list">
        <li className="folder-shortcuts__item">Folder 1</li>
        <li className="folder-shortcuts__item">Folder 2</li>
      </ul>
    </div>
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
