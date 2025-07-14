const User = require('../MongoDB/model');
const dayjs = require('dayjs');

const cPost = async (req, res) => {
    const post_id = req.params.post_id;
    const username = req.params.username;

    try{
        const user = await User.findOne({ username });
        const post = user.posts.find(p => p._id.toString() === post_id);

        return res.status(200).json({ image: user.image, post, comments: post.comments });
        
    } catch (error) {
        return res.status(500).json({ message: "Internal Server Error"});
    }
}

const comment = async (req, res) => {
    const { username, post_id } = req.params;
    const { newComment, commenter } = req.body;

    try {
        const user = await User.findOne({ username });
        if(!user) return res.status(404).json({ message: "User Not Found"});
        const post = user.posts.find(p => p._id.toString() === post_id);

        post.comments.unshift({ content: newComment, date: dayjs().format('DD-MM-YYYY'), commenter: commenter});

        post.commentNo += 1;
        await user.save();

        return res.status(200).json({ success: true, message: "comment"});
    } catch (error) {
         return res.status(500).json({ message : "Internal Server Error"});
    }
}

module.exports = { cPost, comment };