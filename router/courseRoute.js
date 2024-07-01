// courseRoutes.js
const express = require('express');
const router = express.Router();
const { verifyToken } = require('../middleware/middlewares');
const courseController = require('../controllers/courseController');

router.post('/create-course', verifyToken, courseController.createCourse);

router.get('/course/:id', verifyToken,courseController.getCourseById);

router.get('/:universityId/courses', verifyToken,courseController.getCoursesByUniversity);

module.exports = router;
