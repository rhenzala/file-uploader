const express = require('express');
const passport = require('passport');
const { register, logout } = require('../controllers/authController');
const router = express.Router();

router.get('/', (req, res) => res.render('index'));
router.get('/login', (req, res) => res.render('login'));
router.post('/login', passport.authenticate('local', { successRedirect: '/files', failureRedirect: '/' }));
router.get('/register', (req, res) => res.render('register'));
router.post('/register', register);
router.get('/logout', logout);

module.exports = router;
