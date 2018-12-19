import React from 'react';

import Sidebar from './Sidebar';
import Topbar from './Topbar';
import NoteList from './NoteList';

const App = () => (
  <>
    <Sidebar />
    <div className="notelist-wrapper">
      <Topbar />
      <NoteList />
    </div>
  </>
);

export default App;
