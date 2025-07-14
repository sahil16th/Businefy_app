const jwt = require("jsonwebtoken");
const User = require("../MongoDB/model");
const multer = require("multer");
const cloudinary = require("../Config/Cloudinary");
const fs = require("fs");
const bcrypt = require('bcryptjs');

const profile = async (req, res) => {
  const token = req.params.token;
  try {
    const decoded = jwt.verify(token, "Sahil123//");
    const user = await User.findById(decoded.id);

    return res.status(200).json({ username: user.username, image: user.image });
  } catch (error) {
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

const profileUpload = multer({ dest: "uploads/" });

const profileImg = async (req, res) => {
  const token = req.params.token;
  console.log(token);
  try {
    console.log("hii");
    let imageUrl = "";
    const decoded = jwt.verify(token, "Sahil123//");
  
    if (req.file) {
      console.log("uploading");
      const result = await cloudinary.uploader.upload(req.file.path, {
        folder: "profile",
      });
      fs.unlinkSync(req.file.path);
      console.log(result.secure_url);
      imageUrl = result.secure_url;
    } else {
      console.log("no");
    }
    const user = await User.findById(decoded.id);

    user.image = imageUrl;
    await user.save();

    return res
      .status(200)
      .json({ success: true, message: "Image Updated successfully" });
  } catch (error) {
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

const posts = async (req, res) => {
  const token = req.params.token;

  try {
    const decoded = jwt.verify(token, 'Sahil123//');

    const user = await User.findById(decoded.id);
    
    return res.status(200).json({ success: true, posts: user.posts.slice().reverse() });
  } catch(error) {
    return res.status(500).json({ success: false });
  }
}

const updatePassword = async (req, res) => {
  const token = req.params.token;
  const { current } = req.body;
  console.log(current);

  try{
    const decoded = jwt.verify(token, 'Sahil123//');
    const user = await User.findById(decoded.id);

    const hashPassword = await bcrypt.hash(current, 10);
    user.password = hashPassword;
    await user.save();

    return res.status(200).json({ success: true, message: "Password Updated Successfully"});
  } catch (error) {
    return res.status(500).json({ success: false, message: "Internal Server Error"});
  }
}

module.exports = { profile, profileImg, profileUpload, posts, updatePassword };