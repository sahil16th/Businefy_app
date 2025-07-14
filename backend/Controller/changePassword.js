const User = require('../MongoDB/model');
const bcrypt = require('bcryptjs');

const changePassword = async (req, res) => {
    const {email, password} = req.body;

    try{
        const user = await User.findOne({ email });
        const hashPassword = await bcrypt(password, 10);
        user.password = hashPassword;
        await user.save();
        return res.status(200).json({ success: true, message: "Password Updated Successfully"});
    } catch (error) {
        return res.status(500).json({ success: dalse, message: "Internal Server Error"});
    }
}