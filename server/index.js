// set env
process.env.NODE_CONFIG_DIR = `${__dirname}/config`;

// import modules
const bodyParser = require('body-parser');
const session = require('express-session');
const MySQLStore = require('express-mysql-session')(session);
const app = require('express')();
const proxy = require('http-proxy-middleware');
const config = require('config');
const routes = require('./routes');
const logger = require('./helpers/logger');
const errorHandler = require('./middlewares/errorHandler');

// access log
app.use(logger.access);

app.use(bodyParser.json());

// create `req.session`
const sessionStore = new MySQLStore(Object.assign(
  {},
  config.get('mysql'),
  {
    clearExpired: true,
    checkExpirationInterval: 900000,
    expiration: 86400000,
    createDatabaseTable: true,
    endConnectionOnClose: true,
  }
));

app.use(session({
  secret: 'your-secret',
  resave: false,
  store: sessionStore,
  saveUninitialized: true,  // TODO: Edit this depends on use case.
  cookie: {
    maxAge: 86400000,
  },
}));

// Proxy Route
// TODO: Change or delete this middleware adjusting your usecase
app.use(
  '/proxy-sample',
  proxy({
    target: 'http://www.example.org',
    changeOrigin: true })
);

// API Routes
const routeKeys = Object.keys(routes);
for (let i = 0; i < routeKeys.length; i += 1) {
  app.use(routes[routeKeys[i]]);
}

// Error Handler
app.use(errorHandler);

module.exports = {
  path: '/',
  handler: app,
};
