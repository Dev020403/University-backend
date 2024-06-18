const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const courseSchema = new Schema({
    name: { type: String, required: true },
    university: { type: Schema.Types.ObjectId, ref: 'University', required: true },
    description: String,
    duraction: Number,
    feeStructure: Number,
    facilities: [String],
    resources: [String],
    studentFeedback: [{
        student: { type: Schema.Types.ObjectId, ref: 'Student' },
        review: String,
        rating: Number,
        date: { type: Date, default: Date.now }
    }]
}, { timestamps: true });

module.exports = mongoose.model('Course', courseSchema);
