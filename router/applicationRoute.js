const express = require('express');
const router = express.Router();
const { verifyToken } = require('../middleware/middlewares');
const applicationController = require('../controllers/applicationController');

// Route to create a new application
router.post('/create-application', verifyToken, applicationController.createApplication);

// Route to update the application status
router.put('/:applicationId/status', verifyToken, applicationController.updateApplicationStatus);

// Route to get student's applications
router.get('/student-applications/:studentId', verifyToken, applicationController.getStudentApplications);

// Route to get student's applications for university
router.get('/university-applications/:universityId', verifyToken, applicationController.getUniversityApplications);

router.get('/:universityId/totalData', applicationController.getTotalUniversityData);

module.exports = router;
