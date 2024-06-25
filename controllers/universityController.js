// universityController.js

const University = require('../model/universitySchema');

// Controller to get all universities
const getAllUniversity = async (req, res) => {
    try {
        const universities = await University.find();
        res.status(200).json(universities);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Controller to get a university by ID
const getUniversityById = async (req, res) => {
    const { id } = req.params;

    try {
        const university = await University.findById(id);

        if (!university) {
            return res.status(404).json({ message: 'University not found' });
        }

        res.status(200).json(university);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};
const updateUniversity = async (req, res) => {
    const { _id } = req.params;
    const updateData = req.body;

    try {
        const updatedUniversity = await University.findByIdAndUpdate(_id, updateData, { new: true, runValidators: true });

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
