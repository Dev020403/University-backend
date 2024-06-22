// universityRoutes.js
const express = require('express');
const router = express.Router();
const studentController = require('../controllers/studentController');
const { verifyToken } = require('../middleware/middlewares');

// GET all universities
router.get('/students', verifyToken, studentController.getAllStudents);

// GET a university by ID
router.get('/students/:id', verifyToken, studentController.getStudentById);

// Update student details
router.put('/update-student/:_id', studentController.updateStudentDetails);

module.exports = router;
