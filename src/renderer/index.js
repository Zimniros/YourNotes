import '@babel/polyfill';

import React from 'react';
import ReactDOM from 'react-dom';
import { HashRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import Map from '../lib/Map';

import './styles/main.scss';
import App from './components/App';
import reducers from './reducers';
import resolveNotes from '../lib/resolveNotes';
import resolveStorage from '../lib/resolveStorage';

const initStore = async () => {
  const storeData = {
    folders: new Map(),
    notes: new Map(),
  };

  const folders = await resolveStorage();
  const notes = await resolveNotes();

  folders.map(folder => storeData.folders.set(folder.id, folder));
  notes.map(note => storeData.notes.set(note.key, note));

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
