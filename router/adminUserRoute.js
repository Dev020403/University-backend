const express = require('express');
const router = express.Router();
const adminUserController = require('../controllers/adminUserController');

router.post('/register', adminUserController.register);
router.post('/login', adminUserController.login);
router.get('/all-users', adminUserController.getAllUsers);
router.delete('/delete-user/:userId', adminUserController.deleteUser);
router.put('/update-user/:userId', adminUserController.updateUser);

module.exports = router;
