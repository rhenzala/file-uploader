const express = require('express');
const { createFolder, deleteFolder } = require('../controllers/folderController');
const router = express.Router();

module.exports = (isAuthenticated) => {
    router.post('/create', isAuthenticated, createFolder);
    router.post('/delete/:id', isAuthenticated, deleteFolder);
    return router;
  };
  
