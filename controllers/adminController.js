const bcrypt = require('bcrypt');
const Student = require('../model/studentSchema');
const University = require('../model/universitySchema');
const Admin = require('../model/adminSchema');
const { generateToken } = require('../middleware/middlewares');

const updateStudentStatus = async (req, res) => {
    const { studentId } = req.params;
    const { status } = req.body;

    if (!['active', 'inactive'].includes(status)) {
        return res.status(400).json({ error: 'Invalid status value' });
    }

    try {
        const updatedStudent = await Student.findByIdAndUpdate(
            studentId,
            { status: status },
            { new: true }
        );

        if (!updatedStudent) {
            return res.status(404).json({ error: 'Student not found' });
        }

        res.status(200).json({ message: 'Student status updated successfully', student: updatedStudent });
    } catch (error) {
        res.status(500).json({ error: 'Internal server error', details: error.message });
    }
};

const updateUniversityStatus = async (req, res) => {
    const { universityId } = req.params;
    const { status } = req.body;

    if (!['active', 'inactive'].includes(status)) {
        return res.status(400).json({ error: 'Invalid status value' });
    }

    try {
        const updatedUniversity = await University.findByIdAndUpdate(
            universityId,
            { status: status },
            { new: true }
        );

        if (!updatedUniversity) {
            return res.status(404).json({ error: 'University not found' });
        }

        res.status(200).json({ message: 'University status updated successfully', university: updatedUniversity });
    } catch (error) {
        res.status(500).json({ error: 'Internal server error', details: error.message });
    }
};

const signupAdmin = async (req, res) => {
    const { username, password } = req.body;

    try {
        let admin = await Admin.findOne({ username });
        if (admin) {
            return res.status(400).json({ error: 'Admin already exists' });
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        admin = new Admin({ username, password: hashedPassword });
        await admin.save();

        res.status(201).json({ message: 'Admin registered successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Internal server error', details: error.message });
    }
};

const loginAdmin = async (req, res) => {
    const { username, password } = req.body;

    try {
        const admin = await Admin.findOne({ username });

        if (!admin) {
            return res.status(400).json({ error: 'Invalid credentials' });
        }
        console.log(admin)

        console.log(password, admin.password, typeof (password), typeof (admin.password))
        const isMatch = await bcrypt.compare(password, admin.password);

        if (!isMatch) {
            return res.status(400).json({ error: 'Invalid credentials' });
        }
        if (admin.status !== 'active') {
            return res.status(403).json({ error: 'Account is inactive' });
        }
        const token = generateToken(admin._id, admin.username, 'admin');

        res.status(200).json({ user: admin, token, role: 'admin' });

    } catch (error) {
        res.status(500).json({ error: 'Internal server error', details: error.message });
    }
};

module.exports = {
    updateStudentStatus,
    updateUniversityStatus,
    signupAdmin,
    loginAdmin,
};
