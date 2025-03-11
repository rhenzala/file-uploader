const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

exports.listFolders = async (req, res) => {
  const folders = await prisma.folder.findMany({ where: { userId: req.user.id } });
  res.render('folders', { folders });
};

exports.createFolder = async (req, res) => {
  await prisma.folder.create({ data: { name: req.body.name, userId: req.user.id } });
  res.redirect('/folders');
};
