// universityRoutes.js
const express = require('express');
const router = express.Router();
const universityController = require('../controllers/universityController');
const { verifyToken } = require('../middleware/middlewares');

// GET all universities
router.get('/universities', verifyToken, universityController.getAllUniversity);

// GET a university by ID
router.get('/universities/:id', verifyToken, universityController.getUniversityById);

module.exports = router;
