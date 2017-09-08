import dedent from 'dedent';
import React from 'react';
import ReactDOM from 'react-dom/server';
import { Provider } from 'react-redux';
import { flushChunkNames } from 'react-universal-component/server';
import flushChunks from 'webpack-flush-chunks';
import configureStore from './configureStore';
import App from '../src/components/App';

const createApp = (App, store) => (
  <Provider store={store}>
    <App />
  </Provider>
);

export default ({ clientStats }) => async (req, res) => {
  const store = await configureStore(req, res);

  // No store means that the redirect was already served.
  if (!store) return;

  const app = createApp(App, store);
  const appString = ReactDOM.renderToString(app);
  const stateJson = JSON.stringify(store.getState());
  const chunkNames = flushChunkNames();
  const { js, styles, cssHash } = flushChunks(clientStats, { chunkNames });

  console.log('REQUESTED PATH:', req.path);
  console.log('CHUNK NAMES:', chunkNames);

  /* eslint-disable consistent-return */
  return res.send(dedent`
    <!DOCTYPE html>

    <html>
      <head>
        <meta charset="utf-8">
        <title>redux-first-router-demo</title>
        ${styles}
      </head>

      <body>
        <script>window.REDUX_STATE= ${stateJson}</script>
        <div id="root">${appString}</div>
        ${cssHash}
        <script type='text/javascript' src='/static/vendor.js'></script>
        ${js}
      </body>
    </html>
  `);
  /* eslint-enable consistent-return */
};
