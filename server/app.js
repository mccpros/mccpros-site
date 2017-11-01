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

// Uncomment and add controller for API
// import Controller from './controllers/controller';

// Express server setup
const app       = express();
const server    = http.createServer(app);
const apiRouter = Router();

const PORT = process.env.NODE_ENV === 'prod' ? 80 : 3000;

// Webpack Dev Setup
const compiler = webpack(webpackConfig);

app.use(require('webpack-dev-middleware')(compiler, {
  noInfo: true, publicPath: webpackConfig.output.publicPath
}));

app.use(require('webpack-hot-middleware')(compiler, {
 'log': false,
 'path': '/__webpack_hmr',
 'heartbeat': 10 * 1000
}));

// Express options/middlewares
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, '../client/public')));

// Init api
app.use('/api', apiRouter);

// Install Controllers
// const controller = new Controller(apiRouter);

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
