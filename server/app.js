// Make a .env file
require('dotenv').config();

// Node/Express Stuff
import fs         from 'fs';
import http       from 'http';
import path       from 'path';
import morgan     from 'morgan';
import bodyParser from 'body-parser';
import express, { Router } from 'express';

// Webpack Stuff
import webpack       from 'webpack';
import webpackConfig from '../webpack/webpack.dev';
const compiler = webpack(webpackConfig);

// Uncomment and add controller for API
import MessageController from './controllers/Message';

// Express server setup
const app       = express();
const server    = http.createServer(app);
const apiRouter = Router();

const PORT = process.env.NODE_ENV === 'production' ? 80 : 3000;

// Webpack Dev Setup
if(process.env.NODE_ENV !== 'production') {
  app.use(require('webpack-dev-middleware')(compiler, {
    noInfo: true, publicPath: webpackConfig.output.publicPath
  }));
  app.use(require('webpack-hot-middleware')(compiler, {
    // 'webpack-hot-middleware/client?path=/__webpack_hmr&timeout=20000&reload=true'
    'log': false,
    'path': '/__webpack_hmr',
    'heartbeat': 10 * 1000
  }));
}

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
app.use('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/public/index.html'))
});

// HTTPS Setup (PRODUCTION ONLY)
// if(process.env.NODE_ENV === 'prod') {
  // const options = {
  //   key  : fs.readFileSync(path.join(__dirname, '..', 'file.key')),
  //   cert : fs.readFileSync(path.join(__dirname, '..', 'file.crt'))
  // };
  //
  // https.createServer(options, app).listen(443, function () {
  //   console.log('Started!');
  // });
// }

server.listen(PORT, err => {
  console.log(err || `Listening on port ${PORT}`);
});
