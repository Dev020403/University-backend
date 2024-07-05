// universityRoutes.js
const express = require('express');
const router = express.Router();
const universityController = require('../controllers/universityController');
const { verifyToken, authorizeRole } = require('../middleware/middlewares');

// GET all universities : done
router.get('/universities', universityController.getAllUniversity);

// GET a university by ID :done
router.get('/universities/:id', verifyToken, authorizeRole(['student', 'university', 'admin']), universityController.getUniversityById);

// PUT update a university by ID : done
router.put('/update-university/:id', verifyToken, authorizeRole(['university', 'admin']), universityController.updateUniversityDetails);

module.exports = router;
