import 'babel-core/polyfill';

import React from 'react';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import App from './containers/App';
import configureStore from './store/configureStore';
import 'todomvc-app-css/index.css';

const initialState = window.__INITIAL_STATE__;

const store = configureStore(initialState);

React.render(
  <Provider store={store}>
    {() => <App />}
  </Provider>,
  document.getElementById('root')
);
