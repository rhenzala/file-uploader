const express = require('express');
const passport = require('passport');
const { register, logout } = require('../controllers/authController');
const router = express.Router();

module.exports = (supabase) => {
  router.get('/', (req, res) => res.render('index'));
  router.get('/login', (req, res) => res.render('index'));
  router.post('/login', passport.authenticate('local', { successRedirect: '/files', failureRedirect: '/' }));
  router.get('/register', (req, res) => res.render('index', {auth: 'register'}));
  router.post('/register', (req, res) => register(req, res, supabase));
  router.get('/loginPartial', (req, res) => {
    res.render('login');
  });
  router.get('/registerPartial', (req, res) => {
    res.render('register');
  });
  router.get('/logout', logout);
  return router;
};
