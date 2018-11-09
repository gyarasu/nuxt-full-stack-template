const log4js = require('log4js');
const config = require('config');

log4js.configure(config.get('log'));

module.exports = {
  app: log4js.getLogger('app'),
  error: log4js.getLogger('error'),
  access: log4js.connectLogger(log4js.getLogger('access'), {
    level: log4js.levels.INFO,
  }),
};
