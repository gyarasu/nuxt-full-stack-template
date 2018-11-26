const logger = require('../helpers/logger').error;

module.exports = (err, req, res, next) => {
  // TODO: Add Notification
  logger.error(err);

  if (res.headersSent) {
    return next();
  }

  return res.status(500).json({
    msg: 'Something Wrong.',
  });
}
