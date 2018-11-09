const logger = require('../helpers/logger').error;

module.exports = (err, req, res, next) => {
  // TODO: Add Notification
  logger.error(err);

  if (res.headerSent) {
    return next(err);
  }

  return res.status(500).json({
    msg: 'Something Wrong.',
  });
}
