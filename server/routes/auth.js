const { Router } = require('express');
const config = require('config');
const { connection } = require('../models');

const router = Router();

// Dummy Credentials
const dummyEmail = 'user.sample@myapp.com';
const dummyPassWord = '123123';

// LOGIN API
router.post('/api/auth/login', (req, res, next) => {
  try {
    if (req.body.email === dummyEmail && req.body.password === dummyPassWord) {
      req.session.authUser = { email: req.body.email };

      // insert latest login
      const query = connection.query('INSERT INTO t_latest_login_history SET ? ON DUPLICATE KEY UPDATE ?', [{
        user_id: req.body.email,
        create_date: new Date(),
        update_date: new Date(),
      }, {
        update_date: new Date(),
      }], (error) => {
        if (error) {
          next(error);
        } else {
          return res.status(200).json({
            status: 'ok',
          })
        }
      });
    } else {
      return res.status(401).json({
        message: 'Bad credentials',
      });
    }
  } catch(err) {
    next(err);
  }
});


// LOGOUT API
router.post('/api/auth/logout', (req, res, next) => {
  try {
    req.session.destroy((err) => {
      if (err) {
        // TODO: Replace Error Log
        console.log('error', err);
      }
    });

    return res.json({
      status: 'ok',
    });
  } catch(err) {
    next(err);
  }
});

module.exports = router;
