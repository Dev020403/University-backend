const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const universitySchema = new Schema({
    name: { type: String, required: true },
    about: String,
    history: String,
    mission: String,
    values: String,
    logo: String,
    coverPhoto: String,
    courses: [{ type: Schema.Types.ObjectId, ref: 'Course' }],
    placementStats: {
        percentagePlaced: Number,
        avgSalary: Number,
        highestSalary: Number,
        topRecruiters: [String],
    },
    contactDetails: {
        address: String,
        phone: String,
        email: String,
        website: String,
    },
}, { timestamps: true });

module.exports = mongoose.model('University', universitySchema);
