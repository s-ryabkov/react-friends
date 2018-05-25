require('babel-register')();
const server = require('./server');
const AppConfig = require('../config/appConfig');

server.listen(AppConfig.PORT, () => {
  console.log(`Server is up and running with ENV [${AppConfig.NODE_ENV}] on port: ${AppConfig.PORT}`);
});
