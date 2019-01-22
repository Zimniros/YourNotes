import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';

import Sidebar from './Sidebar';
import Topbar from './Topbar';
import NoteList from './NoteList';
import Details from './Details';

import AddFolderModal from './modals/AddFolderModal';

const App = () => (
  <Router>
    <div className="app">
      <Sidebar />
      <div className="notelist-wrapper">
        <Topbar />
        <NoteList />
      </div>
      <Details />
      <AddFolderModal />
    </div>
  </Router>
);

export default App;
