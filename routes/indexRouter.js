const express = require('express');
const router = express.Router();

// Controller can also be imported here if you separate logic
// const { getHome } = require('../controllers/homeController');

router.get('/', (req, res) => {
  res.render('index', { title: 'Home Page' });
  // OR if using controller:
  // getHome(req, res);
});

module.exports = router;
