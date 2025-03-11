const express = require('express');
const { createFolder, listFolders } = require('../controllers/folderController');
const router = express.Router();

router.get('/', listFolders);
router.post('/create', createFolder);

module.exports = router;
