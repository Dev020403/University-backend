// courseRoutes.js
const express = require('express');
const router = express.Router();
const { verifyToken, authorizeRole } = require('../middleware/middlewares');
const courseController = require('../controllers/courseController');

router.post('/create-course', verifyToken, authorizeRole(['university', 'admin']), courseController.createCourse);

router.get('/course/:id', verifyToken, authorizeRole(['student', 'university', 'admin']), courseController.getCourseById);

router.get('/:universityId/courses', verifyToken, authorizeRole(['student', 'university', 'admin']), courseController.getCoursesByUniversity);

router.delete('/delete-courses/:id', verifyToken, authorizeRole(['university', 'admin']), courseController.deleteCourse);

router.put('/update-courses/:id', verifyToken, authorizeRole(['university', 'admin']), courseController.updateCourse);

module.exports = router;
