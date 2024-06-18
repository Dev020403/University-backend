const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    role: { type: String, enum: ['student', 'university'], required: true },
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    profile: {
        name: { type: String, required: true },
        personalInfo: {
            dob: Date,
            address: String,
            phone: String,
        },
        academicBackground: {
            jeePr: Number,
            boardPr: Number,
        },
        preferences: [String],
    },
    status: { type: String, enum: ['active', 'inactive'], default: 'active' },
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);
