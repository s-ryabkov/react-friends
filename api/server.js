const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const morgan = require('morgan');
const path = require('path');
const app = express();
const serveStatic = require('serve-static');
const AppConfig = require('./../config/appConfig');
const routes = require('./routes/index');
const serverRenderer = require('./middleware/serverRenderer');

/**
 * Middleware
 */
app.use(morgan('combined'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());

routes(app);

switch (AppConfig.NODE_ENV) {
  case 'production':
    app.use(serveStatic(path.join(__dirname, './../dist')));
    app.get('*', serverRenderer);
    break;
  case 'development':
    require('./../config/webpack.dev')(app);
    break;
  case 'test':
    break;
  default:
    console.log('Shut down the server - wrong "NODE_ENV" environment.');
    process.exit(0);
}

module.exports = app;
