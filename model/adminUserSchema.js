const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userAdminSchema = new Schema({
    name: { type: String, required: true },
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    contact: { type: String, required: true },
    role: { type: mongoose.Schema.Types.ObjectId, ref: 'Role' },
    status: { type: String, enum: ['active', 'inactive'], default: 'active' },
}, { timestamps: true });

module.exports = mongoose.model('UserAdmin', userAdminSchema);
