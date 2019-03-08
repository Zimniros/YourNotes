/* eslint-disable react/prop-types */
import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

import Sidebar from './Sidebar';
import TopBar from './TopBar';
import NoteList from './NoteList';

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
        <div className="notes-viewer">
          <TopBar />
          <NoteList />
        </div>
        <Details />
        <ModalRoot />
      </div>
    );
  }
}

export default withRouter(App);
