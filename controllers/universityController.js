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
    console.log(req.body);
    try {
        let university = await University.findById(id);

        if (!university) {
            return res.status(404).json({ error: 'University not found' });
        }

        if (req.body.name) {
            university.name = req.body.name;
        }
        if (req.body.about) {
            university.about = req.body.about;
        }
        if (req.body.history) {
            university.history = req.body.history;
        }
        if (req.body.mission) {
            university.mission = req.body.mission;
        }
        if (req.body.values) {
            university.values = req.body.values;
        }
        if (req.body.logo) {
            university.logo = req.body.logo;
        }
        if (req.body.coverPhoto) {
            university.coverPhoto = req.body.coverPhoto;
        }
        if (req.body.placementStats) {
            if (req.body.placementStats.percentagePlaced) {
                university.placementStats.percentagePlaced = req.body.placementStats.percentagePlaced;
            }
            if (req.body.placementStats.avgSalary) {
                university.placementStats.avgSalary = req.body.placementStats.avgSalary;
            }
            if (req.body.placementStats.highestSalary) {
                university.placementStats.highestSalary = req.body.placementStats.highestSalary;
            }
            if (req.body.placementStats.topRecruiters) {
                university.placementStats.topRecruiters = req.body.placementStats.topRecruiters;
            }
        }
        if (req.body.contactDetails) {
            if (req.body.contactDetails.address) {
                university.contactDetails.address = req.body.contactDetails.address;
            }
            if (req.body.contactDetails.phone) {
                university.contactDetails.phone = req.body.contactDetails.phone;
            }
            if (req.body.contactDetails.website) {
                university.contactDetails.website = req.body.contactDetails.website;
            }
        }

        await university.save();
        res.json(university);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};



module.exports = {
    getAllUniversity,
    getUniversityById,
    updateUniversityDetails
};
