const express = require('express');
const router = express.Router();
const { verifyToken, authorizeRole } = require('../middleware/middlewares');
const applicationController = require('../controllers/applicationController');

// Route to create a new application
router.post('/create-application', verifyToken, authorizeRole(['student']), applicationController.createApplication);

// Route to update the application status
router.put('/:applicationId/status', verifyToken, authorizeRole(['university']), applicationController.updateApplicationStatus);

// Route to get student's applications
router.get('/student-applications/:studentId', verifyToken, authorizeRole(['student', 'admin']), applicationController.getStudentApplications);

// Route to get student's applications for university
router.get('/university-applications/:universityId', verifyToken, authorizeRole(['university', 'admin']), applicationController.getUniversityApplications);

router.get('/:universityId/totalData', verifyToken, authorizeRole(['university', 'admin']), applicationController.getTotalUniversityData);

module.exports = router;
