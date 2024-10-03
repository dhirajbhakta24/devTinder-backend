const mongoose = require('mongoose');


const connectDB = async() => {
    await mongoose.connect(
        "mongodb+srv://dhirajearns:Rl7zLCiMZoY60yOl@devtinderbackend.e8nr6.mongodb.net/"
    );
};
module.exports = connectDB;