import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

import './styles/main.scss';
import App from './components/App';
import reducers from './reducers';
import resolveStorage from '../lib/resolveStorage';

const folders = resolveStorage();
const store = createStore(reducers, { folders }, applyMiddleware(thunk));

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root'),
);
