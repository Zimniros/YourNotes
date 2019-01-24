import React from 'react';
import ReactDOM from 'react-dom';
import { HashRouter as Router, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { createStore } from 'redux';

import './styles/main.scss';
import App from './components/App';
import reducers from './reducers';
import resolveStorage from '../lib/resolveStorage';

const folders = resolveStorage();
const store = createStore(reducers, { folders });

ReactDOM.render(
  <Provider store={store}>
    <Router>
      <Route path="/" component={App} />
    </Router>
  </Provider>,
  document.getElementById('root'),
);
