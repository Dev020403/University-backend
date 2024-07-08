const Student = require('../model/studentSchema');
const Application = require('../model/applicationSchema');
exports.getAllStudents = async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const search = req.query.search || '';
        const skip = (page - 1) * limit;

        // Create a search condition
        const searchCondition = search
            ? {
                $or: [
                    { 'profile.name': { $regex: search, $options: 'i' } },
                    { email: { $regex: search, $options: 'i' } },
                    { 'profile.personalInfo.phone': { $regex: search, $options: 'i' } },
                ],
            }
            : {};

        const students = await Student.find(searchCondition)
            .skip(skip)
            .limit(limit);

        const total = await Student.countDocuments(searchCondition);
        const totalPages = Math.ceil(total / limit);

        res.status(200).json({
            students,
            page,
            totalPages,
            total,
        });
    } catch (error) {
        res.status(500).json({ message: 'Error fetching students', error });
    }
};


// Get student by ID
exports.getStudentById = async (req, res) => {
    const { id } = req.params;
    try {
        const student = await Student.findById(id);
        if (!student) {
            return res.status(404).json({ message: 'Student not found' });
        }
        res.status(200).json(student);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching student', error });
    }
};
exports.updateStudentDetails = async (req, res) => {
    const { _id } = req.params;

    try {
        let student = await Student.findOne({ _id });

        if (!student) {
            return res.status(404).json({ error: 'Student not found' });
        }
        if (req.body.name) {
            student.profile.name = req.body.name;
        }
        if (req.body.personalInfo) {
            if (req.body.personalInfo.dob) {
                student.profile.personalInfo.dob = req.body.personalInfo.dob;
            }
            if (req.body.personalInfo.address) {
                student.profile.personalInfo.address = req.body.personalInfo.address;
            }
            if (req.body.personalInfo.phone) {
                student.profile.personalInfo.phone = req.body.personalInfo.phone;
            }
        }
        if (req.body.academicBackground) {
            if (req.body.academicBackground.jeePr) {
                student.profile.academicBackground.jeePr = req.body.academicBackground.jeePr;
            }
            if (req.body.academicBackground.boardPr) {
                student.profile.academicBackground.boardPr = req.body.academicBackground.boardPr;
            }
        }
        if (req.body.preferences) {
            student.profile.preferences = req.body.preferences;
        }

        await student.save();

        res.json(student);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
}

exports.deleteStudent = async (req, res) => {
    const { id } = req.params;

    try {
        const student = await Student.findById(id);
        if (!student) {
            return res.status(404).json({ message: 'Student not found' });
        }

        await Application.deleteMany({ student: student._id });

        await student.deleteOne();

        res.json({ message: 'Student and associated applications deleted successfully' });
    } catch (error) {
        console.error('Error deleting student and associated applications:', error);
        res.status(500).json({ message: 'Error deleting student and associated applications', error });
    }
};