const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const reviewSchema = new Schema({
    student: { type: Schema.Types.ObjectId, ref: 'Student', required: true },
    university: { type: Schema.Types.ObjectId, ref: 'University' },
    course: { type: Schema.Types.ObjectId, ref: 'Course' },
    reviewText: { type: String, required: true },
    rating: { type: Number, required: true },
    date: { type: Date, default: Date.now }
}, { timestamps: true });

module.exports = mongoose.model('Review', reviewSchema);
