module.exports = (req, res, next) => {
  if (req.session.authUser) {
    next();
  } else {
    return res.status(401).json({ error: 'Unauthorized' });
  }
};
