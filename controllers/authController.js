const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');
const prisma = new PrismaClient();

exports.register = async (req, res) => {
  const hashedPassword = await bcrypt.hash(req.body.password, 10);
  await prisma.user.create({ data: { username: req.body.username, password: hashedPassword } });
  res.redirect('/');
};

exports.logout = (req, res) => req.logout(() => res.redirect('/'));
