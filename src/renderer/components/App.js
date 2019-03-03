/* eslint-disable react/prop-types */
import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

import Sidebar from './Sidebar';
import NotesViewer from './NotesViewer';
import Details from './Details';

import ModalRoot from './modals';

class App extends Component {
  componentDidMount() {
    const { location, history } = this.props;
    const { pathname } = location;
    const { push } = history;

    if (pathname === '/') push('/home');
  }

  render() {
    return (
      <div className="app">
        <Sidebar />
        <NotesViewer />
        <Details />
        <ModalRoot />
      </div>
    );
  }
}

export default withRouter(App);
