const UserAdmin = require('../model/adminUserSchema');
const Role = require('../model/roleSchema');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

exports.register = async (req, res) => {
    const { name, username, email, password, contact, role } = req.body;
    try {
        const existingUser = await UserAdmin.findOne({ $or: [{ email }, { username }] });
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists' });
        }

        const existingRole = await Role.findById(role);
        if (!existingRole) {
            return res.status(400).json({ message: 'Invalid role' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = new UserAdmin({
            name,
            username,
            email,
            password: hashedPassword,
            contact,
            role,
        });

        await newUser.save();
        res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};

exports.login = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await UserAdmin.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1h' });

        res.status(200).json({ token, user: { id: user._id, name: user.name, email: user.email, role: user.role } });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};

exports.getAllUsers = async (req, res) => {
    try {
        const users = await UserAdmin.find().populate('role');
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};

exports.deleteUser = async (req, res) => {
    try {
        const user = await UserAdmin.findByIdAndDelete(req.params.userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.status(200).json({ message: 'User deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};

exports.updateUser = async (req, res) => {
    const { name, username, email, contact, role, password } = req.body;
    try {
        const user = await UserAdmin.findById(req.params.userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        if (role) {
            const existingRole = await Role.findById(role);
            if (!existingRole) {
                return res.status(400).json({ message: 'Invalid role' });
            }
            user.role = role;
        }

        if (password) {
            user.password = await bcrypt.hash(password, 10);
        }

        user.name = name || user.name;
        user.username = username || user.username;
        user.email = email || user.email;
        user.contact = contact || user.contact;

        await user.save();
        res.status(200).json({ message: 'User updated successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};
