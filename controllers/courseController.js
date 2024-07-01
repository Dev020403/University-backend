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

const getCourseById = async (req, res) => {
    const { id } = req.params;

    try {
        const course = await Course.findById(id);

        if (!course) {
            return res.status(404).json({ message: 'Course not found' });
        }

        res.status(200).json(course);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

const getCoursesByUniversity = async (req, res) => {
    const { universityId } = req.params;

    try {
        const courses = await Course.find({ university: universityId })
        if (!courses) {
            return res.status(404).json({ message: 'No courses found for this university' });
        }
        res.status(200).json(courses);
    } catch (error) {
        console.error('Error fetching courses:', error);
        res.status(500).json({ message: 'Server error' });
    }
};

const deleteCourse = async (req, res) => {
    const { id } = req.params;

    try {
        // Find the course by ID
        const course = await Course.findById(id);
        if (!course) {
            return res.status(404).json({ message: 'Course not found' });
        }

        // Remove the course from the university's course list
        const universityId = course.university;
        await University.findByIdAndUpdate(
            universityId,
            { $pull: { courses: id } },
            { new: true }
        );

        // Delete the course
        await Course.findByIdAndDelete(id);

        res.status(200).json({ message: 'Course deleted successfully' });
    } catch (error) {
        console.error('Error deleting course:', error);
        res.status(500).json({ message: 'Server error' });
    }
};


const updateCourse = async (req, res) => {
    const { id } = req.params;
    const { name, description, duration, feeStructure, facilities, resources } = req.body;

    try {
        const course = await Course.findById(id);
        if (!course) {
            return res.status(404).json({ message: 'Course not found' });
        }

        course.name = name || course.name;
        course.description = description || course.description;
        course.duration = duration || course.duration;
        course.feeStructure = feeStructure || course.feeStructure;
        course.facilities = facilities || course.facilities;
        course.resources = resources || course.resources;

        const updatedCourse = await course.save();
        res.status(200).json(updatedCourse);
    } catch (error) {
        console.error('Error updating course:', error);
        res.status(500).json({ message: 'Server error' });
    }
};

module.exports = {
    createCourse, getCourseById, getCoursesByUniversity, deleteCourse, updateCourse
};
