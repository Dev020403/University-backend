// universityController.js

const University = require('../model/universitySchema');

// Controller to get all universities
const getAllUniversity = async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1; 
        const limit = parseInt(req.query.limit) || 10; 
        const skip = (page - 1) * limit;

        const universities = await University.find()
            .populate('courses')
            .skip(skip)
            .limit(limit);

        const total = await University.countDocuments();
        const totalPages = Math.ceil(total / limit);

        res.status(200).json({
            universities,
            page,
            totalPages,
            total
        });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Controller to get a university by ID
const getUniversityById = async (req, res) => {
    const { id } = req.params;

    try {
        const university = await University.findById(id).populate('courses');

        if (!university) {
            return res.status(404).json({ message: 'University not found' });
        }

        res.status(200).json(university);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Controller to update a university
const updateUniversity = async (req, res) => {
    const { id } = req.params;
    const updateData = req.body;

    try {
        const updatedUniversity = await University.findByIdAndUpdate(id, updateData, { new: true, runValidators: true });

        if (!updatedUniversity) {
            return res.status(404).json({ message: 'University not found' });
        }

        res.json(updatedUniversity);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

module.exports = {
    getAllUniversity,
    getUniversityById,
    updateUniversity
};
