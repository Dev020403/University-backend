// authController.js
const bcrypt = require('bcrypt');
const University = require('../model/universitySchema');
const Student = require('../model/studentSchema');
const { generateToken } = require('../middleware/middlewares');

const registerUniversity = async (req, res) => {
    const { username, email, password, name, about, history, mission, values, logo, coverPhoto, courses, placementStats, contactDetails } = req.body;

    try {
        const existingUniversity = await University.findOne({ username });
        const existingStudent = await Student.findOne({ username });

        if (existingUniversity || existingStudent) {
            return res.status(400).json({ message: 'Username already exists' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const newUniversity = new University({
            username,
            email,
            password: hashedPassword,
            name,
            about,
            history,
            mission,
            values,
            logo,
            coverPhoto,
            courses,
            placementStats,
            contactDetails
        });
        await newUniversity.save();
        res.status(201).json({ message: 'University registered successfully' });
    } catch (error) {
        console.error('Error registering university:', error);
        res.status(500).json({ message: 'Failed to register university' });
    }
};

const registerStudent = async (req, res) => {
    const { username, email, password, profile, status } = req.body;

    try {
        const existingUniversity = await University.findOne({ username });
        const existingStudent = await Student.findOne({ username });

        if (existingUniversity || existingStudent) {
            return res.status(400).json({ message: 'Username already exists' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const newStudent = new Student({
            username,
            email,
            password: hashedPassword,
            profile,
            status,
            role: 'student'
        });
        await newStudent.save();

        res.status(201).json({ message: 'Student registered successfully' });
    } catch (error) {
        console.error('Error registering student:', error);
        res.status(500).json({ message: 'Failed to register student' });
    }
};
const login = async (req, res) => {
    const { username, password } = req.body;

    try {
        let user = await University.findOne({ username });
        let role = 'university';
        if (!user) {
            user = await Student.findOne({ username });
            role = 'student';
        }
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({ message: 'Invalid password' });
        }

        // Check if user status is active
        if (user.status !== 'active') {
            return res.status(403).json({ message: 'User is not active. Please contact admin.' });
        }

        const token = generateToken(user._id, user.username, role);

        res.status(200).json({ token, role, user });
    } catch (error) {
        console.error('Error logging in:', error);
        res.status(500).json({ message: 'Failed to log in' });
    }
};


module.exports = {
    registerUniversity,
    registerStudent,
    login
};
