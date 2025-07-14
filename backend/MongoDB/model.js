const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
    content: {
        type: String,
    }, 
    date: {
        type: String,
    },
    commenter: {
        type: String
    }
})

const postSchema = new mongoose.Schema({
    content: {
        type: String
    },
    likes: {
        type: Number
    },
    commentNo: {
        type: Number
    },
    imageUrl: {
        type: String
    },
    date: {
      type: String
    },
    comments: [commentSchema]
})

const userSchema = new mongoose.Schema({
    username: {
        type: String
    }, 
    email: {
        type: String
    },
    password: {
        type: String
    },
    otp: {
        type: String
    },
    isVerified: {
        type: Boolean,
        default: false
    },
    image:{
        type: String,
        default: "https://img.freepik.com/premium-vector/businessman-cartoon-style-illustration_1234575-22.jpg"
    },
    posts: [postSchema]
});

const User = mongoose.model('User', userSchema);

module.exports = User;