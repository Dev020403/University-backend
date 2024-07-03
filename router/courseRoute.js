// courseRoutes.js
const express = require('express');
const router = express.Router();
const { verifyToken } = require('../middleware/middlewares');
const courseController = require('../controllers/courseController');

router.post('/create-course', verifyToken,courseController.createCourse);

router.get('/course/:id',verifyToken,courseController.getCourseById);

router.get('/:universityId/courses',courseController.getCoursesByUniversity);

router.delete('/delete-courses/:id', courseController.deleteCourse);

router.put('/update-courses/:id', courseController.updateCourse);

module.exports = router;
