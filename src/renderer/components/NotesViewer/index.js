import React from 'react';

import Topbar from './Topbar';
import NoteList from './NoteList';

const NotesViewer = () => (
  <div className="notes-viewer">
    <Topbar />
    <NoteList />
  </div>
);

export default NotesViewer;
