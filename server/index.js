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

const isProd = !process.env.NODE_ENV === 'development';
const nuxt = new Nuxt({ dev: !isProd });

if (!isProd) {
  const builder = new Builder(nuxt);
  builder.build();
}

app.use(nuxt.render);
app.listen(3000);

console.log('Server is listening on http://localhost:3000');
