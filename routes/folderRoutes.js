const express = require('express');
const { listFolders, createFolder, deleteFolder } = require('../controllers/folderController');

module.exports = (isAuthenticated) => {
  const router = express.Router();
  router.post('/create', isAuthenticated, createFolder);
  router.post('/delete/:id', isAuthenticated, deleteFolder);
  return router;
};
