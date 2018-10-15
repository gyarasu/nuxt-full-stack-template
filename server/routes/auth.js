const { Router } = require('express');
const config = require('config');

const router = Router();

// Dummy Credentials
const dummyEmail = 'user.sample@myapp.com';
const dummyPassWord = '123123';

// LOGIN API
router.post('/api/auth/login', (req, res, next) => {
  if (req.body.email === dummyEmail && req.body.password === dummyPassWord) {
    req.session.authUser = { username: req.body.email };
    return res.status(200).json({
      status: 'ok',
    });
  }
  return res.status(401).json({
    error: 'Bad credentials',
  });
});


// LOGOUT API
router.post('/api/auth/logout', (req, res, next) => {
  req.session.destroy((err) => {
    if (err) {
      // TODO: Replace Error Log
      console.log('error', err);
    }
  });

  return res.json({
    status: 'ok',
  });
});

module.exports = router
