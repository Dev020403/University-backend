const mongoose = require('mongoose');
const connectDb = async () => {
    try {
        const conn = await mongoose.connect(process.env.DATABASE_URL);
        if (conn) {
            console.log('Connected to MongoDB database');
        }
    } catch (error) {
        console.log('Error in MongoDB', error);
    }
};

module.exports = connectDb;
