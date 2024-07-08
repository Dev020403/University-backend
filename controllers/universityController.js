// universityController.js

const University = require('../model/universitySchema');

// Controller to get all universities
const getAllUniversity = async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const search = req.query.search || '';
        const skip = (page - 1) * limit;

        const searchCondition = search
            ? { name: { $regex: search, $options: 'i' } }
            : {};

        const universities = await University.find(searchCondition)
            .populate('courses')
            .skip(skip)
            .limit(limit);

        const total = await University.countDocuments(searchCondition);
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
const updateUniversityDetails = async (req, res) => {
    const { id } = req.params;

    try {
        let university = await University.findById(id);

        if (!university) {
            return res.status(404).json({ error: 'University not found' });
        }

        // Update fields if provided in req.body
        if (req.body.name) university.name = req.body.name;
        if (req.body.about) university.about = req.body.about;
        if (req.body.history) university.history = req.body.history;
        if (req.body.mission) university.mission = req.body.mission;
        if (req.body.values) university.values = req.body.values;
        if (req.body.logo) university.logo = req.body.logo;
        if (req.body.coverPhoto) university.coverPhoto = req.body.coverPhoto;

        // Update placementStats if provided in req.body
        if (req.body.placementStats) {
            const { placementStats } = req.body;
            if (placementStats.percentagePlaced) {
                university.placementStats.percentagePlaced = placementStats.percentagePlaced;
            }
            if (placementStats.avgSalary) {
                university.placementStats.avgSalary = placementStats.avgSalary;
            }
            if (placementStats.highestSalary) {
                university.placementStats.highestSalary = placementStats.highestSalary;
            }
            if (placementStats.topRecruiters) {
                university.placementStats.topRecruiters = placementStats.topRecruiters;
            }
        }

        // Update contactDetails if provided in req.body
        if (req.body.contactDetails) {
            const { contactDetails } = req.body;
            if (contactDetails.address) {
                university.contactDetails.address = contactDetails.address;
            }
            if (contactDetails.phone) {
                university.contactDetails.phone = contactDetails.phone;
            }
            if (contactDetails.website) {
                university.contactDetails.website = contactDetails.website;
            }
        }

        await university.save();
        res.json(university);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};
const deleteUniversity = async (req, res) => {
    const { id } = req.params;

    try {
        const university = await University.findById(id);

        if (!university) {
            return res.status(404).json({ message: 'University not found' });
        }

        await Course.deleteMany({ university: university._id });

        await Application.deleteMany({ university: university._id });

        // Delete the university
        await university.deleteOne();
        res.status(200).json({ message: 'University deleted successfully' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};
module.exports = {
    getAllUniversity,
    getUniversityById,
    updateUniversityDetails,
    deleteUniversity
};
