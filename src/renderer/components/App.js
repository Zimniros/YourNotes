import React from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';

import Sidebar from './Sidebar/index';
import Topbar from './Topbar';
import NoteList from './NoteList';
import Details from './Details';

const App = () => (
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

export default App;
