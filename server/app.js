// Make a .env file
require('dotenv').config();

// Node/Express Stuff
import fs         from 'fs';
import http       from 'http';
import https      from 'https';
import path       from 'path';
import morgan     from 'morgan';
import bodyParser from 'body-parser';
import domain     from 'forcedomain';
import secure     from './middleware/secure';
import express, { Router } from 'express';

// Webpack Stuff
import webpack       from 'webpack';
import webpackConfig from '../webpack/webpack.dev';
const compiler = webpack(webpackConfig);

// Uncomment and add controller for API
import MessageController from './controllers/Message';

const production = process.env.NODE_ENV === 'production';

// Express server setup
const app       = express();
const apiRouter = Router();
// const server    = http.createServer(app);

const PORT = production ? 80 : 3000;

// Webpack Dev Setup
if(!production) {
  app.use(require('webpack-dev-middleware')(compiler, {
    noInfo: true, publicPath: webpackConfig.output.publicPath
  }));
  app.use(require('webpack-hot-middleware')(compiler, {
    'log': false,
    'path': '/__webpack_hmr',
    'heartbeat': 10 * 1000
  }));
}

// Express options/middlewares
app.get('*.js', function (req, res, next) {
  req.url = req.url + '.gz';
  res.set('Content-Encoding', 'gzip');
  next();
});

app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, '../client/public')));

// Init api
app.use('/api', apiRouter);

// Install Controllers
const controller = new MessageController(apiRouter);
const domainOpts = {
                      hostname: 'www.mccpros.com',
                      port: 443,
                      protocol: 'https'
                   };

// Client Side Rendering
app.use('*', secure(), (req, res) => {
  console.log('yo0');
  res.sendFile(path.join(__dirname, '../client/public/index.html'));
});

// HTTPS Setup (PRODUCTION ONLY)
if(production) {
  const options = {
    key  : fs.readFileSync(process.env.KEY_PATH),
    cert : fs.readFileSync(process.env.CRT_PATH)
  };

  https
    .createServer(options, app)
    .listen(443, (err) => {
      console.log(err || 'Listening on port 443');
  });
}

http
  .createServer(app)
  .listen(PORT, err => {
    console.log(err || `Listening on port ${PORT}`);
});
