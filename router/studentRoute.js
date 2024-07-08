// universityRoutes.js
const express = require('express');
const router = express.Router();
const studentController = require('../controllers/studentController');
const { verifyToken, authorizeRole } = require('../middleware/middlewares');

// GET all students
router.get('/students', verifyToken, authorizeRole(['university', 'admin']), studentController.getAllStudents);

// GET a student by ID
router.get('/students/:id', verifyToken, authorizeRole(['university', 'admin', 'student']), studentController.getStudentById);

// Update student details
router.put('/update-student/:_id', verifyToken, authorizeRole(['student', 'admin']), studentController.updateStudentDetails);

// Delete a student
router.delete('/delete-student/:id', verifyToken, authorizeRole(['admin']), studentController.deleteStudent);

module.exports = router;
