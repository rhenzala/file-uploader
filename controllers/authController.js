const bcrypt = require('bcryptjs');
const prisma = require('../prisma');

exports.register = async (req, res) => {
  const { username, password } = req.body;
  const existingUser = await prisma.user.findUnique({ where: { username } });
  if (existingUser) return res.render('register', { error: 'Username already taken.' });

  const hashedPassword = await bcrypt.hash(password, 10);
  await prisma.user.create({ data: { username, password: hashedPassword } });
  res.redirect('/');
};


exports.logout = (req, res) => req.logout(() => res.redirect('/'));
