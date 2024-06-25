const Application = require('../model/applicationSchema');
const Student = require('../model/studentSchema'); // Ensure this model exists
const University = require('../model/universitySchema');
const Course = require('../model/courseSchema');

// Controller for creating a new application
const createApplication = async (req, res) => {
    try {
        const { studentId, universityId, courseId, documents } = req.body;

        // Check if the student exists
        const student = await Student.findById(studentId);
        if (!student) {
            return res.status(404).json({ message: 'Student not found' });
        }

        // Check if the university exists
        const university = await University.findById(universityId);
        if (!university) {
            return res.status(404).json({ message: 'University not found' });
        }

        // Check if the course exists
        const course = await Course.findById(courseId);
        if (!course) {
            return res.status(404).json({ message: 'Course not found' });
        }

        // Create a new application
        const newApplication = new Application({
            student: studentId,
            university: universityId,
            course: courseId,
            documents,
        });

        // Save the application
        const savedApplication = await newApplication.save();

        res.status(201).json(savedApplication);
    } catch (error) {
        console.error('Error creating application:', error);
        res.status(500).json({ message: 'Server error', error });
    }
};

// Controller for updating the application status
const updateApplicationStatus = async (req, res) => {
    try {
        const { applicationId } = req.params;
        const { status } = req.body;

        // Check if the application exists
        const application = await Application.findById(applicationId);
        if (!application) {
            return res.status(404).json({ message: 'Application not found' });
        }

        // Update the application status
        application.applicationStatus = status;
        application.decisionDate = status === 'accepted' || status === 'rejected' ? Date.now() : null;
        const updatedApplication = await application.save();

        res.status(200).json(updatedApplication);
    } catch (error) {
        console.error('Error updating application status:', error);
        res.status(500).json({ message: 'Server error', error });
    }
};

module.exports = {
    createApplication,
    updateApplicationStatus,
};
