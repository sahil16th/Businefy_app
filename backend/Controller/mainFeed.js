const postModel = require('../MongoDB/postModel');

const mainFeed = async (req, res) => {
    try{
        const posts = await postModel.find({});
        const allPost = posts.slice().reverse();
        return res.status(200).json({ success: true, posts: allPost});
    } catch (error) {
        return res.status(500).json({ success: false, message: "Internal Server Error"});
    }
}

module.exports = mainFeed;