const { Nuxt, Builder } = require('nuxt');
const bodyParser = require('body-parser');
const session = require('express-session');
const app = require('express')();

app.use(bodyParser.json());

// create `req.session`
app.use(session({
  secret: 'super-secret-key',
  resave: false,
  saveUninitialized: false,
  cookie: { maxAge: 6000 },
}));

const isProd = !process.env.NODE_ENV === 'development';
const nuxt = new Nuxt({ dev: !isProd });

if (!isProd) {
  const builder = new Builder(nuxt);
  builder.build();
}

app.use(nuxt.render);
app.listen(3000);

console.log('Server is listening on http://localhost:3000');
