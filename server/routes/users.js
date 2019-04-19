const { Router } = require('express');
const { connection } = require('../models');
const authenticated = require('../middlewares/authenticated');
const router = Router();

router.use('/users/', authenticated);

router.get('/users/login-history', (req, res, next) => {
  try {
    const query = connection.query('SELECT update_date from t_latest_login_history WHERE user_id = ?',[
      req.session.authUser.email
    ], (error, results) => {
      if (error) {
        next(error);
      } else {
        return res.status(200).json({
          latestLogin: results[0].update_date,
        });
      }
    });
  } catch(err) {
    next(err);
  }
});

module.exports = router;
