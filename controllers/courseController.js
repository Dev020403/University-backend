const Course = require('../model/courseSchema');
const University = require('../model/universitySchema');

// Controller for creating a course
const createCourse = async (req, res) => {
    try {
        const { name, universityId, description, duration, feeStructure, facilities, resources } = req.body;

        // Check if the university exists
        const uni = await University.findById(universityId);
        if (!uni) {
            return res.status(404).json({ message: 'University not found' });
        }

        // Create a new course
        const newCourse = new Course({
            name,
            university: universityId,
            description,
            duration,
            feeStructure,
            facilities,
            resources,
        });

        // Save the course
        const savedCourse = await newCourse.save();

        // Add the course to the university's course list
        uni.courses.push(savedCourse._id);
        await uni.save();

        res.status(201).json(savedCourse);
    } catch (error) {
        console.error('Error creating course:', error);
        res.status(500).json({ message: 'Server error', error });
    }
};

module.exports = {
    createCourse
};
