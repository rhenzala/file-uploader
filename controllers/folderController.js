const prisma = require('../prisma');

exports.createFolder = async (req, res) => {
  await prisma.folder.create({
    data: {
      name: req.body.name,
      userId: req.user.id,
      parentFolderId: req.body.folderId ? parseInt(req.body.folderId) : null,
    },
  });
  res.redirect('back');
};

exports.deleteFolder = async (req, res) => {
  await prisma.folder.delete({ where: { id: parseInt(req.params.id) } });
  res.redirect('back');
};
