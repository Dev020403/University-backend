const express = require('express');
const router = express.Router();
const adminUserController = require('../controllers/adminUserController');

router.post('/register', adminUserController.register);

router.post('/login', adminUserController.login);

module.exports = router;
