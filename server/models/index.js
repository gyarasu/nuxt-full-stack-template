// TODO: Manage connection pool and transaction

const mysql = require('mysql');
const config = require('config');

const conf = {
  host: config.get('mysql.host'),
  user: config.get('mysql.user'),
  password: config.get('mysql.password'),
  database: config.get('mysql.database'),
};

const connection = mysql.createConnection(conf);

module.exports = {
  conf,
  connection,
};
