const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

exports.listFiles = async (req, res) => {
  const files = await prisma.file.findMany({ where: { userId: req.user.id } });
  res.render('files', { files });
};

exports.uploadFile = async (req, res) => {
  res.send('Upload feature coming soon.');
};
