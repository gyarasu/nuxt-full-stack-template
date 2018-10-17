const { Router } = require('express');
const { connection } = require('../models');
const authenticated = require('../middlewares/authenticated');

const router = Router();

router.use('/api/users/', authenticated);

router.get('/api/users/login-history', (req, res, next) => {
  const query = connection.query('SELECT update_date from t_latest_login_history WHERE user_id = ?',[
    req.session.authUser.email
  ], (error, results) => {
    if (error) {
      return res.status(500).json({
        status: 'Something Wrong on Server.',
      });
    } else {
      return res.status(200).json({
        latestLogin: results[0].update_date,
      });
    }
  });
});

module.exports = router;
