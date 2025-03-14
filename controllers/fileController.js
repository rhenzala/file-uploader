const { getFileUrl, getPublicUrl } = require('../utils/helper');
const prisma = require('../prisma');
const supabase = require('../supabase-client');

exports.listFiles = async (req, res) => {
  const folderId = req.params.folderId ? parseInt(req.params.folderId) : null;

  const files = await prisma.file.findMany({
    where: { userId: req.user.id, folderId },
  });

  const folders = await prisma.folder.findMany({
    where: { userId: req.user.id, parentFolderId: folderId },
  });

  const filesWithUrls = await Promise.all(files.map(async file => {
    const viewUrl = await getFileUrl(supabase, file.path, false);
    const downloadUrl = await getFileUrl(supabase, file.path, true, file.name);
    return {
      ...file,
      viewUrl,
      downloadUrl
    };
  }));

  res.render('dashboard', { files: filesWithUrls, folders, folderId, user: req.user });
};

exports.uploadFile = async (req, res) => {
  try {
    if (!req.file) {
      console.error('No file uploaded.');
      return res.status(400).send('No file uploaded.');
    }

    const fileName = `${Date.now()}-${req.file.originalname}`;

    const { data, error } = await supabase.storage
      .from('files')
      .upload(fileName, req.file.buffer, {
        contentType: req.file.mimetype,
        upsert: false,
      });

    if (error) {
      console.error('Supabase upload error:', error);
      return res.status(500).send('File upload failed.');
    }

    // Don't store the signed URL in the database since it expires
    // Just store the path and generate signed URLs when needed
    await prisma.file.create({
      data: {
        name: req.file.originalname,
        path: fileName,
        size: req.file.size,
        userId: req.user.id,
        folderId: req.body.folderId ? parseInt(req.body.folderId) : null,
        publicUrl: '', 
      },
    });

    res.redirect(req.get("Referrer") || "/");
  } catch (err) {
    console.error('Upload error:', err);
    res.status(500).send('Internal server error.');
  }
};

exports.deleteFile = async (req, res) => {
  const file = await prisma.file.findUnique({ where: { id: parseInt(req.params.id) } });
  if (file) {
    await supabase.storage.from('files').remove([file.path]);
    await prisma.file.delete({ where: { id: file.id } });
  }
  res.redirect('back');
};

exports.viewFile = async (req, res) => {
  try {
    const file = await prisma.file.findFirst({
      where: { id: parseInt(req.params.id), userId: req.user.id },
    });

    if (!file) return res.status(404).send('File not found or access denied.');

    const viewUrl = await getFileUrl(supabase, file.path, false);
    const downloadUrl = await getFileUrl(supabase, file.path, true, file.name);
    
    if (!viewUrl || !downloadUrl) {
      return res.status(404).send('Could not generate file access URLs.');
    }

    res.render('fileDetails', { 
      file, 
      viewUrl, 
      downloadUrl,
      user: req.user 
    });
  } catch (err) {
    console.error('View file error:', err);
    res.status(500).send('Internal server error');
  }
};