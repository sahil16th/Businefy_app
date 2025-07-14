const mongoose = require('mongoose');

const connectDB = async () =>{
    try{
        await mongoose.connect('mongodb+srv://Sahil16_th:OgQHk4kTytV35FjR@cluster0.ds5mamr.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0/mydatabase');
        console.log("✔️  Connected to DataBase");
    } catch (error) {
        console.log("❌  Failed to connect DataBase");
    }
}

module.exports = connectDB;
