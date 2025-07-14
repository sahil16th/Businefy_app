const mongoose = require('mongoose');

const connectDB = async () =>{
    try{
        await mongoose.connect('mongodb+srv://sahilsaini22001:sahilsaini22001@cluster0.en552d2.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0/mydatabase');
        console.log("✔️  Connected to DataBase");
    } catch (error) {
        console.log("❌  Failed to connect DataBase");
    }
}

module.exports = connectDB;
