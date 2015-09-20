import path from 'path';
import Express from 'express';
import React from 'react';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import rootReducer from '../client/reducers';
import App from '../client/containers/App';

const app = Express();
const port = 3000;

// Use this middleware to serve up static files built into the dist directory
app.use(require('serve-static')(path.join(__dirname, '../../dist')));
app.set('view engine', 'jade');

var todos = [{
  text: 'Use Redux servers',
  completed: false,
  id: 0
}];

// This is fired every time the server side receives a request
app.use(function (req, res) {
    // Create a new Redux store instance
  const store = createStore(rootReducer, {todos}); // pass initial state

  // Render the component to a string
  const html = React.renderToString(
    <Provider store={store}>
      {() => <App />}
    </Provider>
  );

  // Grab the initial state from our Redux store
  const initialState =  store.getState();

  // Send the rendered page back to the client
  res.send(renderFullPage(html, initialState));
});

function renderFullPage(html, initialState) {
  return `
    <!doctype html>
    <html>
      <head>
        <title>Redux Universal Example</title>
      </head>
      <body>
        <div id="root" class="todoapp">${html}</div>
        <script>
          window.__INITIAL_STATE__ = ${JSON.stringify(initialState)};
        </script>
        <script src="/bundle.js"></script>
      </body>
    </html>
    `;
}

app.listen(port);