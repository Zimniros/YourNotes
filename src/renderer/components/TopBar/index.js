import React from 'react';

import Icon from '@mdi/react';
import { mdiFilePlus as newNote, mdiSortDescending as sort } from '@mdi/js';

import SearchBar from './SearchBar';

const TopBar = () => (
  <div className="top-bar">
    <div className="top-bar__row">
      <Icon className="top-bar__icon" path={sort} />
      <div>All Notes</div>
      <Icon className="top-bar__icon" path={newNote} />
    </div>
    <SearchBar />
  </div>
);

export default TopBar;
