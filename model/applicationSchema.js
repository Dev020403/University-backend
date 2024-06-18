const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const applicationSchema = new Schema({
    student: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    university: { type: Schema.Types.ObjectId, ref: 'University', required: true },
    course: { type: Schema.Types.ObjectId, ref: 'Course', required: true },
    applicationStatus: { type: String, enum: ['submitted', 'underReview', 'accepted', 'rejected'], default: 'submitted' },
    documents: [String],
    submissionDate: { type: Date, default: Date.now },
    decisionDate: Date,
}, { timestamps: true });

module.exports = mongoose.model('Application', applicationSchema);
