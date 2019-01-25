/* eslint-disable react/prop-types */
import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import Icon from '@mdi/react';
import { mdiFilePlus as newNote, mdiSortDescending as sort } from '@mdi/js';

import SearchBar from './SearchBar';

const TopBar = ({ locationName }) => (
  <div className="top-bar">
    <div className="top-bar__row">
      <Icon className="top-bar__icon" path={sort} />
      <div title={locationName} className="top-bar__location-name">
        {locationName}
      </div>
      <Icon className="top-bar__icon" path={newNote} />
    </div>
    <SearchBar />
  </div>
);

const mapStateToProps = state => ({ locationName: state.locationName });

export default withRouter(connect(mapStateToProps)(TopBar));
