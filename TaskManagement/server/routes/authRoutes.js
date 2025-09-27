const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const verifyToken = require('../middleware/auth');

router.post('/create', verifyToken(['owner','admin']), authController.createUser);
router.post('/login', authController.loginUser);

module.exports = router;
