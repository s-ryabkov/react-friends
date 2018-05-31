const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const compression = require('compression');
const morgan = require('morgan');
const path = require('path');
const app = express();
const serveStatic = require('serve-static');
const AppConfig = require('./../config/appConfig');
const routes = require('./routes/index');

/**
 * Middleware
 */
app.use(compression());
// Use for http request debug (show errors only)
app.use(morgan('combined', { skip: (req, res) => res.statusCode < 400 }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());

routes(app);

switch (AppConfig.NODE_ENV) {
  case 'production':
    app.use(serveStatic(path.join(__dirname, './../dist')));
    app.use(require('./middleware/serverRenderer'));
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
