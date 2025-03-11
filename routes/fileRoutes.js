const express = require('express');
const { uploadFile, listFiles } = require('../controllers/fileController');
const router = express.Router();

router.get('/', listFiles);
router.post('/upload', uploadFile); 

module.exports = router;
