const mongoose = require('mongoose');

const db = async () => {
    try {
        const db = await mongoose.connect('mongodb://127.0.0.1:27017/social_media_app');
        console.log('DB connected');
        return db;
    } catch (err) {
        console.error('Error in MongoDB connection', err);
        throw err;
    }
};

// Call the function to connect to the database
db();

// Export the mongoose object for potential usage elsewhere
module.exports = db;
