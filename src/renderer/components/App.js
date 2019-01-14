import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';

import Sidebar from './Sidebar';
import Topbar from './Topbar';
import NoteList from './NoteList';
import Details from './Details';

import resolveStorage from '../../lib/resolveStorage';

class App extends Component {
  componentDidMount() {
    resolveStorage();
  }

  render() {
    return (
      <Router>
        <div className="app">
          <Sidebar />
          <div className="notelist-wrapper">
            <Topbar />
            <NoteList />
          </div>
          <Details />
        </div>
      </Router>
    );
  }
}

export default App;
