require('dotenv').config();
const express = require('express');
const session = require('express-session');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcryptjs');
const { PrismaClient } = require('@prisma/client');
const path = require('path');
const multer = require('multer');
const PORT = process.env.PORT || 3000;

const prisma = new PrismaClient();
const app = express();

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, 'uploads/'),
  filename: (req, file, cb) => cb(null, Date.now() + '-' + file.originalname)
});
const upload = multer({ storage });

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));
app.use('/uploads', express.static('uploads'));

app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
}));
app.use(passport.initialize());
app.use(passport.session());

passport.use(new LocalStrategy(async (username, password, done) => {
  const user = await prisma.user.findUnique({ where: { username } });
  if (!user) return done(null, false);
  const isMatch = await bcrypt.compare(password, user.password);
  return isMatch ? done(null, user) : done(null, false);
}));
passport.serializeUser((user, done) => done(null, user.id));
passport.deserializeUser(async (id, done) => done(null, await prisma.user.findUnique({ where: { id } })));

const isAuthenticated = (req, res, next) => {
  if (req.isAuthenticated()) return next();
  res.redirect('/login');
};

const authRoutes = require('./routes/authRoutes');
const fileRoutes = require('./routes/fileRoutes')(upload, isAuthenticated);
const folderRoutes = require('./routes/folderRoutes')(isAuthenticated);

app.use('/', authRoutes);
app.use('/files', fileRoutes);
app.use('/folders', folderRoutes);

app.listen(PORT, () => console.log(`Server running at http://localhost:${PORT}`));
