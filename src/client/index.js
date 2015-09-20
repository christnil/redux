import 'babel-core/polyfill';

import React from 'react';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import App from './containers/App';
import rootReducer from '../client/reducers';
import configureStore from './store/configureStore';
import 'todomvc-app-css/index.css';

const initialState = window.__INITIAL_STATE__;

const store = createStore(rootReducer, initialState);

React.render(
  <Provider store={store}>
    {() => <App />}
  </Provider>,
  document.getElementById('root')
);
