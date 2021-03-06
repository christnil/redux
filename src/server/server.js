import path from 'path';
import Express from 'express';
import React from 'react';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import rootReducer from '../client/reducers';
import App from '../client/containers/App';

const app = Express();
const port = process.env.PORT || 3002;

// Use this middleware to serve up static files built into the public directory
app.use(require('serve-static')(path.join(__dirname, '../../public')));


var todos = [{
  text: 'Use Redux',
  completed: true,
  id: 0
},{
  text: 'Use server rendering',
  completed: true,
  id: 1
},{
  text: 'Use webpack with gulp',
  completed: false,
  id: 2
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
        <title>TODO</title>
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