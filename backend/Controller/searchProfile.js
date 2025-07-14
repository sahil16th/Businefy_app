const User = require('../MongoDB/model');

const searchProfile = async (req, res) => {
    const { users } = req.body;
    console.log(users);

    try{
        const user = await User.findOne({ username: users });

        if(!user) {
            return res.status(400).json({ success: false, message: "User Not Found" })
        }
        console.log(user);

        return res.status(200).json({ success: true, user, posts: user.posts });
    } catch (error) {
        return res.status(500).json({ success: false, message: "Internal Server Error"});
    }
}

module.exports = searchProfile;