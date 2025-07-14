const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
    username :{
        type : String
    },
    post_id: {
        type: String
    },
    content: {
       type: String 
    },
    likes: {
        type: Number
    },
    commentNo: {
        type: Number
    },
    date: {
        type: String
    },
    userImage: {
        type: String
    },
    imageUrl: {
        type: String
    }
});

const postModel = mongoose.model('posts', postSchema);

module.exports = postModel;