const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const adminSchema = new Schema({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, enum: ['admin'], default: 'admin' },
    status: { type: String, enum: ['active', 'inactive'], default: 'active' },
}, { timestamps: true });

module.exports = mongoose.model('Admin', adminSchema);
