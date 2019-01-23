import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';

import Sidebar from './Sidebar';
import NotesViewer from './NotesViewer';
import Details from './Details';

import AddFolderModal from './modals/AddFolderModal';

const App = () => (
  <Router>
    <div className="app">
      <Sidebar />
      <NotesViewer />
      <Details />
      <AddFolderModal />
    </div>
  </Router>
);

export default App;
