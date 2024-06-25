const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const studentSchema = new Schema({
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
    notifications: [{
        message: String,
        date: { type: Date, default: Date.now },
        isRead: { type: Boolean, default: false }
    }],
    status: { type: String, enum: ['active', 'inactive'], default: 'active' },
}, { timestamps: true });

module.exports = mongoose.model('Student', studentSchema);
