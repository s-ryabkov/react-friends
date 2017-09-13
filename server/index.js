const http = require('http');
const AppConfig = require('../config/appConfig');

const app = require('./app');

const server = http.createServer(app);
server.listen(AppConfig.PORT, () => {
  console.log(`Server is up and running with ENV [${AppConfig.ENV}] on port: ${AppConfig.PORT}`);
});
