const Application = require('../model/applicationSchema');
const Student = require('../model/studentSchema');
const University = require('../model/universitySchema');
const Course = require('../model/courseSchema');
const sendMail = require('../utils/mailer');

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

        // Send email notification
        const message = `You have successfully submitted your application for the course ${course.name} at ${university.name}.`;
        await sendMail(student.email, 'Application Submitted', message);

        // Save notification in student's record
        student.notifications.push({
            message,
            date: new Date(),
            isRead: false
        });
        await student.save();

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

        // Send email notification
        const student = await Student.findById(application.student);
        const message = `Your application status for the course ${application.course} at ${application.university} has been updated to: ${status}.`;
        await sendMail(student.email, 'Application Status Update', message);

        // Save notification in student's record
        student.notifications.push({
            message,
            date: new Date(),
            isRead: false
        });
        await student.save();

        res.status(200).json(updatedApplication);
    } catch (error) {
        console.error('Error updating application status:', error);
        res.status(500).json({ message: 'Server error', error });
    }
};
const getStudentApplications = async (req, res) => {
    try {
        const { studentId } = req.params;
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const search = req.query.search || ''; // Get search query
        const skip = (page - 1) * limit;

        // Create a search condition
        const searchCondition = search
            ? { student: studentId, 'university.name': { $regex: search, $options: 'i' } } // Adjust the field to search as necessary
            : { student: studentId };

        const applications = await Application.find(searchCondition)
            .populate('university')
            .populate('course')
            .skip(skip)
            .limit(limit);

        const total = await Application.countDocuments(searchCondition);
        const totalPages = Math.ceil(total / limit);

        res.status(200).json({
            applications,
            page,
            totalPages,
            total
        });
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

const getUniversityApplications = async (req, res) => {
    try {
        const { universityId } = req.params;
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const search = req.query.search || '';
        const skip = (page - 1) * limit;

        const searchCondition = search
            ? { university: universityId, 'student.name': { $regex: search, $options: 'i' } }
            : { university: universityId };

        const applications = await Application.find(searchCondition)
            .populate('student')
            .populate('course')
            .skip(skip)
            .limit(limit);

        const total = await Application.countDocuments(searchCondition);
        const totalPages = Math.ceil(total / limit);

        res.status(200).json({
            applications,
            page,
            totalPages,
            total
        });
    } catch (error) {
        res.status500.json({ error: 'Internal Server Error' });
    }
};


module.exports = {
    createApplication,
    updateApplicationStatus,
    getStudentApplications,
    getUniversityApplications
};
