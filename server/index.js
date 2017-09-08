import 'babel-polyfill';
import express from 'express';
import morgan from 'morgan';
import cookieParser from 'cookie-parser';
import webpack from 'webpack';
import webpackDevMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';
import webpackHotServerMiddleware from 'webpack-hot-server-middleware';
import clientConfig from '../webpack/client.dev';
import serverConfig from '../webpack/server.dev';
import { findVideos, findVideo } from './api';

const DEV = process.env.NODE_ENV === 'development';
const PORT = process.env.PORT || 80;
const publicPath = clientConfig.output.publicPath;
const outputPath = clientConfig.output.path;
const app = express();

app.use(morgan(DEV ? 'dev' : 'combined'));

// JWTOKEN COOKIE - in a real app obviously you set this after signup/login:

app.use(cookieParser());

app.use((req, res, next) => {
  const cookie = req.cookies.jwToken;
  // TODO: Set the below to 'real' to authenticate ADMIN route
  const jwToken = 'fake';

  if (cookie !== jwToken) {
    res.cookie('jwToken', jwToken, { maxAge: 900000 });
    req.cookies.jwToken = jwToken;
  }

  next();
});

// API

app.get('/api/videos/:category', async (req, res) => {
  const jwToken = req.headers.authorization.split(' ')[1];
  const data = await findVideos(req.params.category, jwToken);
  res.json(data);
});

app.get('/api/video/:slug', async (req, res) => {
  const jwToken = req.headers.authorization.split(' ')[1];
  const data = await findVideo(req.params.slug, jwToken);
  res.json(data);
});

// UNIVERSAL HMR + STATS HANDELING GOODNESS

if (DEV) {
  const multiCompiler = webpack([clientConfig, serverConfig]);
  const clientCompiler = multiCompiler.compilers[0];

  app.use(webpackDevMiddleware(multiCompiler, { publicPath }));
  app.use(webpackHotMiddleware(clientCompiler));
  app.use(
    // Keeps serverRender updated with arg: { clientStats, outputPath }
    webpackHotServerMiddleware(multiCompiler, {
      serverRendererOptions: { outputPath },
    })
  );
}
else {
  /* eslint-disable import/no-unresolved, global-require */
  const clientStats = require('../buildClient/stats.json');
  const serverRender = require('../buildServer/main.js').default;
  /* eslint-enable import/no-unresolved, global-require */

  app.use(publicPath, express.static(outputPath));
  app.use(serverRender({ clientStats, outputPath }));
}

app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
