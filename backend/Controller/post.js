const multer = require("multer");
const cloudinary = require("../Config/Cloudinary");
const fs = require("fs");
const User = require("../MongoDB/model");
const postModel = require('../MongoDB/postModel');
const jwt = require("jsonwebtoken");
const dayjs = require('dayjs');


const upload = multer({ dest: "uploads/" });

const postContent = async (req, res) => {
  const { text, token } = req.body;
  console.log(token)
  try {
    let imageUrl = "";
    if (req.file) {
      const result = await cloudinary.uploader.upload(req.file.path, {
        folder: "post_content",
      });

      fs.unlinkSync(req.file.path); // Clean up the local file
      imageUrl = result.secure_url || "";
    }

    const decoded = jwt.verify(token, "Sahil123//");
    const user = await User.findById(decoded.id);

    user.posts.push({
      content: text,
      likes: 0,
      commentNo: 0,
      imageUrl,
      date: dayjs().format('DD-MM-YYYY'),
      comments: [],
    });

    await user.save();
    
    const lastPost = user.posts[user.posts.length - 1];
    await postModel.create({
      username: user.username,
      post_id: lastPost._id,
      content: text,
      likes: 0,
      commentNo: 0,
      date: dayjs().format('DD-MM-YYYY'),
      userImage: user.image,
      imageUrl
    })

    return res
      .status(200)
      .json({ success: true, message: "post upload successfully" });
  } catch (error) {
    console.log("Error-  ",error);

    return res
      .status(500)
      .json({ success: false, message: "Internal Server Error" });
  }
};

module.exports = { upload, postContent };
