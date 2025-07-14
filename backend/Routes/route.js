const express = require('express');
const User = require('../MongoDB/model');
const {newUser, login, isVerified, verifyToken, changePassword} = require('../Controller/UserAuthentication');
const generateNames = require('../Controller/business');
const chat = require('../Controller/chat')
const {postContent, upload} = require('../Controller/post');
const search = require('../Controller/Search');
const {profile, profileImg, profileUpload, posts, updatePassword} = require('../Controller/Profile');
const { cPost, comment } = require('../Controller/Cpost');
const mainFeed = require('../Controller/mainFeed');
const searchProfile = require('../Controller/searchProfile');
const forgetPassword = require('../Controller/forgetPassword');

const router = express.Router();

router.get('/check', (req, res)=>{
    res.send("Server is running")
})

// routes for User Authentication
router.post('/register', newUser);
router.post('/login', login);
router.post('/otp', isVerified);
router.post('/verifyToken', verifyToken);
router.post('/forgetpassword', forgetPassword);
router.post('/changepassword', changePassword);

// routes for ai
router.post('/generate', generateNames)
router.post('/chat', chat)

router.post('/post', upload.single('image'), postContent);
router.get('/search', search);

router.get('/profile/:token', profile);
router.post('/profileImg/:token', profileUpload.single('image'), profileImg);
router.get('/posts/:token', posts)
router.get('/postInfo/:username/:post_id', cPost);
router.post('/comment/:username/:post_id', comment);
router.post('/updatePassword/:token', updatePassword);

router.get('/mainfeed', mainFeed);
router.post('/userProfile', searchProfile);

module.exports = router;