/* eslint-disable react/prop-types */
import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { func } from 'prop-types';

import Sidebar from './Sidebar';
import NotesViewer from './NotesViewer';
import Details from './Details';

import AddFolderModal from './modals/AddFolderModal';
import { folderPathnameRegex } from './lib/consts';
import { selectFolder } from '../actions';

class App extends Component {
  static propTypes = {
    dispatch: func.isRequired,
  };

  componentDidMount() {
    const { location, history, dispatch } = this.props;
    const { pathname } = location;
    const { push } = history;

    const matchPathname = folderPathnameRegex.exec(pathname);

    if (pathname === '/') push('/home');

    if (matchPathname) {
      dispatch(selectFolder(matchPathname[1]));
    }
  }

  render() {
    return (
      <div className="app">
        <Sidebar />
        <NotesViewer />
        <Details />
        <AddFolderModal />
      </div>
    );
  }
}

export default withRouter(connect(null)(App));
