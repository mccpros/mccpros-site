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
import forceSSL   from 'express-force-ssl';
import force      from 'express-force-domain';
import secure     from './middleware/secure';
import detect     from 'browser-detect';
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
const browser = detect();

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
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, '../client/public')));
app.use(forceSSL);

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
app.get('*.js', (req, res) => {
  console.log(browser.name);
  if(browser.name === 'firefox') {
    return res.sendFile(path.join(__dirname, '../client/build/bundle.js'));
  }

  res.set('Content-Encoding', 'gzip');
  return res.sendFile(path.join(__dirname, '../client/build/bundle.js.gz'));
});


app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/src/index.html'));
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
