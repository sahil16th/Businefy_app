const mongoose = require('mongoose');

const connectDB = async () =>{
    try{
        await mongoose.connect('mongodb://localhost:27017/mydatabase');
        console.log("✔️  Connected to DataBase");
    } catch (error) {
        console.log("❌  Failed to connect DataBase");
    }
}

module.exports = connectDB;