const express = require('express');
const { listFiles, uploadFile, deleteFile, viewFile } = require('../controllers/fileController');

module.exports = (upload, isAuthenticated) => {
  const router = express.Router();
  router.get('/:folderId?', isAuthenticated, listFiles);
  router.post('/upload', isAuthenticated, upload.single('file'), uploadFile);
  router.post('/delete/:id', isAuthenticated, deleteFile);
  router.get('/view/:id', isAuthenticated, viewFile);
  return router;
};
