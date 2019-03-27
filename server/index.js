// Make a .env file
require('dotenv').config();

// Node/Express Stuff
import http from 'http';
import path from 'path';
import morgan from 'morgan';
import bodyParser from 'body-parser';
// import detect from 'browser-detect';
import express, { Router } from 'express';

// Webpack Stuff
import webpack from 'webpack';
import webpackConfig from '../webpack/webpack.dev';
const compiler = webpack(webpackConfig);

// Uncomment and add controller for API
import MessageController from './controllers/Message';

// const production = process.env.NODE_ENV === 'production';

// Express server setup
const app = express();
const apiRouter = Router();

const PORT = 8888;
// const browser = detect();

// Webpack Dev Setup
// if (!production) {
app.use(
  require('webpack-dev-middleware')(compiler, {
    noInfo: true,
    publicPath: webpackConfig.output.publicPath
  })
);
app.use(
  require('webpack-hot-middleware')(compiler, {
    log: false,
    path: '/__webpack_hmr',
    heartbeat: 10 * 1000
  })
);
// }

// Express options/middlewares
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, '../client/public')));

// Init api
app.use('/api', apiRouter);

// Install Controllers
const controller = new MessageController(apiRouter);

// Client Side Rendering
app.get('*.js', (req, res) => {
  // const isFireFox = browser.name === 'firefox';
  // const useGzip = production && !isFireFox;
  // const filePath = useGzip ? '../client/build/bundle.js.gz' : '../client/build/bundle.js';
  const filePath = '../client/build/bundle.js';

  // if (useGzip) {
  //   res.set('Content-Encoding', 'gzip');
  // }
  return res.sendFile(path.join(__dirname, filePath));
});

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/src/index.html'));
});

http.createServer(app).listen(PORT, err => {
  console.log(err || `Listening on port ${PORT}`);
});
