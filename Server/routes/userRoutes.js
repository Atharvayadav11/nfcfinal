const express = require('express');
const multer = require('multer');
const userController = require('../controllers/userController');

const router = express.Router();

// Multer configuration for handling file uploads
const storage = multer.memoryStorage(); // Storing file in memory (you can also store on disk)
const upload = multer({ storage: storage });

router.post('/register', upload.single('file'), userController.registerUser);

module.exports = router;
