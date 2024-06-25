const express = require('express');
const router = express.Router();
const verifyToken = require('../middleware/verifyToken');
const applicationController = require('../controllers/applicationController');

// Route to create a new application
router.post('/create-application', verifyToken, applicationController.createApplication);

// Route to update the application status
router.put('/:applicationId/status', verifyToken, applicationController.updateApplicationStatus);

module.exports = router;
