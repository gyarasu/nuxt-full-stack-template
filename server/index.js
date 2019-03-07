// set env
process.env.NODE_CONFIG_DIR = `${__dirname}/config`;

// import modules
const { Nuxt, Builder } = require('nuxt');
const bodyParser = require('body-parser');
const session = require('express-session');
const MySQLStore = require('express-mysql-session')(session);
const app = require('express')();
const config = require('config');
const routes = require('./routes');
const logger = require('./helpers/logger');
const errorHandler = require('./middlewares/errorHandler');
const nuxtConfig = require('../nuxt.config.js');

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

// API Routes
app.use(routes.auth);
app.use(routes.users);

// Error Handler
app.use(errorHandler);

// Set Environment to Nuxt Config
nuxtConfig.dev = process.env.NODE_ENV === 'development';
const nuxt = new Nuxt(nuxtConfig);

// run build process when the environment is development
if (nuxtConfig.dev) {
  logger.app.debug('Development Mode: Build')
  const builder = new Builder(nuxt);
  builder.build();
}

const port = process.env.PORT || 3000;

app.use(nuxt.render);
app.listen(port);

console.log('Server is listening on http://localhost:3000');

