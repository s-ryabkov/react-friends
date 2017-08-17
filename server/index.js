const http = require('http');
const path = require('path');

// App configuration
const AppConfig = require('../config/appConfig');

const app = require('./routers');

if (AppConfig.ENV !== 'production') {
  require('babel-register')({ ignore: /node_modules/ });
  require('../config/webpack.dev')(app);
} else {
  // add middleware for serving index.html page - in order to support client side routing
  app.use((req, res) => {
    return res.sendFile(path.resolve(process.cwd(), 'dist', 'index.html'));
  });
}

const server = http.createServer(app);
server.listen(AppConfig.PORT, () => {
  console.log(`Server is up and running with ENV [${AppConfig.ENV}] on port: ${AppConfig.PORT}`);
});
