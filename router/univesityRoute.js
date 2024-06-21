// universityRoutes.js
const express = require('express');
const router = express.Router();
const universityController = require('../controllers/universityController');

// GET all universities
router.get('/universities', universityController.getAllUniversity);

// GET a university by ID
router.get('/universities/:id', universityController.getUniversityById);

module.exports = router;
