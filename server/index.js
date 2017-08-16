const http = require('http');

if (process.env.NODE_ENV !== 'production') {
  require('babel-register')({ignore: /node_modules/});
}

// App configuration
const AppConfig = require('../config/appConfig');

const app = require('./routers');

const server = http.createServer(app);
server.listen(AppConfig.PORT, () => {
  console.log(`Server is up and running with ENV [${AppConfig.ENV}] on port: ${AppConfig.PORT}`);
});
