const mongoose = require('mongoose');

const connectDb = async () => {
    try {
        const conn = await mongoose.connect("mongodb+srv://user:user@cluster0.pwo4e0z.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0");
        if (conn) {
            console.log('Connected to MongoDB database');
        }
    } catch (error) {
        console.log('Error in MongoDB', error);
    }
};

module.exports = connectDb;
