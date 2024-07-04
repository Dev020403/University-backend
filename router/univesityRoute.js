// universityRoutes.js
const express = require('express');
const router = express.Router();
const universityController = require('../controllers/universityController');
const { verifyToken } = require('../middleware/middlewares');

// GET all universities
router.get('/universities', universityController.getAllUniversity);

// GET a university by ID
router.get('/universities/:id', verifyToken, universityController.getUniversityById);

// PUT update a university by ID
router.put('/update-university/:id', verifyToken, universityController.updateUniversityDetails);

module.exports = router;
