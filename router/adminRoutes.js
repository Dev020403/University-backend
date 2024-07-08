const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');

router.post('/register', adminController.signupAdmin);

router.post('/login', adminController.loginAdmin);

router.put('/student-status/:studentId', adminController.updateStudentStatus);

router.put('/university-status/:universityId', adminController.updateUniversityStatus);

module.exports = router;