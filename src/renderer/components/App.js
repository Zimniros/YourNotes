import React from 'react';

import Sidebar from './Sidebar/index';
import Topbar from './Topbar';
import NoteList from './NoteList';
import Details from './Details';

const App = () => (
  <>
    <Sidebar />
    <div className="notelist-wrapper">
      <Topbar />
      <NoteList />
    </div>
    <Details />
  </>
);

export default App;
