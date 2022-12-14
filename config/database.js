const mongoose = require('mongoose');
require('dotenv').config(); //allow us to use variables from our .env file

const connectDB = () => {
    try
    {
    mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost/27017');
    console.log("MongoDB connected!!");
    }
    catch(e){
        console.log(e.message);
        process.exit(1);
    }
};

module.exports = connectDB;