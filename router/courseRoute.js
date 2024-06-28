// courseRoutes.js
const express = require('express');
const router = express.Router();
const { verifyToken } = require('../middleware/middlewares');
const courseController = require('../controllers/courseController');

router.post('/create-course', verifyToken, courseController.createCourse);

router.get('/course/:id', courseController.getCourseById);

module.exports = router;
