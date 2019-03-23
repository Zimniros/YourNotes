import React from 'react';
import ReactDOM from 'react-dom';
import { HashRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

import { ipcRenderer } from 'electron';

import Map from './api/Map';
import Set from './api/Set';

import './styles/main.scss';
import App from './components/App';
import reducers from './reducers';

const initStore = () => {
  const storeData = {
    tags: new Map(),
    folders: new Map(),
    notesData: {
      allNotes: new Map(),
      starredNotes: new Set(),
      trashedNotes: new Set()
    }
  };

  ipcRenderer.send('init:start');

  ipcRenderer.on('init:finish', (event, { notes, folders, tags }) => {
    folders.forEach(folder => storeData.folders.set(folder.id, folder));
    tags.forEach(tag => storeData.tags.set(tag.id, tag));
    notes.forEach(note => {
      storeData.notesData.allNotes.set(note.key, note);

      if (note.isStarred) {
        storeData.notesData.starredNotes.add(note.key);
      }

      if (note.isTrashed) {
        storeData.notesData.trashedNotes.add(note.key);
      }
    });

    const store = createStore(reducers, storeData, applyMiddleware(thunk));

    ReactDOM.render(
      <Provider store={store}>
        <Router>
          <App />
        </Router>
      </Provider>,
      document.getElementById('root')
    );
  });
};

initStore();
