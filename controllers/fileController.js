const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

exports.listFiles = async (req, res) => {
  const folderId = req.params.folderId ? parseInt(req.params.folderId) : null;
  const files = await prisma.file.findMany({ where: { userId: req.user.id, folderId } });
  const folders = await prisma.folder.findMany({ where: { userId: req.user.id, parentFolderId: folderId } });
  res.render('dashboard', { files, folders, folderId, user: req.user });
};

exports.viewFile = async (req, res) => {
  const fileId = parseInt(req.params.id);
  const file = await prisma.file.findUnique({
    where: { id: fileId, userId: req.user.id } 
  });

  if (!file) {
    return res.status(404).send('File not found or access denied.');
  }

  res.render('fileDetails', { file, user: req.user });
};

exports.uploadFile = async (req, res) => {
  await prisma.file.create({
    data: {
      name: req.file.originalname,
      path: req.file.filename,
      size: req.file.size,
      userId: req.user.id,
      folderId: req.body.folderId ? parseInt(req.body.folderId) : null
    }
  });
  res.redirect('back');
};

exports.deleteFile = async (req, res) => {
  await prisma.file.delete({ where: { id: parseInt(req.params.id) } });
  res.redirect('back');
};
