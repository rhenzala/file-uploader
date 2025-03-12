const express = require('express');
const { listFiles, uploadFile, deleteFile, viewFile } = require('../controllers/fileController');
const multer = require('multer');
const storage = multer.memoryStorage();
const upload = multer({ storage });
const router = express.Router();

module.exports = (isAuthenticated) => {
    router.get('/:folderId?', isAuthenticated, listFiles);
    router.post('/upload', isAuthenticated, upload.single('file'), uploadFile);
    router.post('/delete/:id', isAuthenticated, deleteFile);
    router.get('/view/:id', isAuthenticated, viewFile);
    return router;
  };
  
