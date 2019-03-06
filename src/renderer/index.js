import '@babel/polyfill';

import React from 'react';
import ReactDOM from 'react-dom';
import { HashRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import Map from '../lib/Map';
import Set from '../lib/Set';

import './styles/main.scss';
import App from './components/App';
import reducers from './reducers';
import resolveNotes from '../lib/resolveNotes';
import resolveStorage from '../lib/resolveStorage';

const initStore = async () => {
  const storeData = {
    tags: new Map(),
    folders: new Map(),
    notesData: {
      allNotes: new Map(),
      starredNotes: new Set(),
      trashedNotes: new Set(),
    },
  };

  const { folders, tags } = await resolveStorage();
  const notes = await resolveNotes();

  folders.forEach(folder => storeData.folders.set(folder.id, folder));
  tags.forEach(tag => storeData.tags.set(tag.id, tag));
  notes.forEach((note) => {
    storeData.notesData.allNotes.set(note.key, note);

    if (note.isStarred) {
      storeData.notesData.starredNotes.add(note.key);
    }

    if (note.isTrashed) {
      storeData.notesData.trashedNotes.add(note.key);
    }
  });

  const store = createStore(reducers, storeData);

  ReactDOM.render(
    <Provider store={store}>
      <Router>
        <App />
      </Router>
    </Provider>,
    document.getElementById('root'),
  );
};

initStore();
