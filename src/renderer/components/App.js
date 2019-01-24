import React from 'react';

import Sidebar from './Sidebar';
import NotesViewer from './NotesViewer';
import Details from './Details';

import AddFolderModal from './modals/AddFolderModal';

const App = () => (
  <div className="app">
    <Sidebar />
    <NotesViewer />
    <Details />
    <AddFolderModal />
  </div>
);

export default App;
