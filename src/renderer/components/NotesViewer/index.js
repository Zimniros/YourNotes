import React from 'react';

import TopBar from '../TopBar';
import NoteList from './NoteList';

const NotesViewer = () => (
  <div className="notes-viewer">
    <TopBar />
    <NoteList />
  </div>
);

export default NotesViewer;
