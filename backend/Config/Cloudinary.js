// backend/config/cloudinary.js
const cloudinary = require('cloudinary').v2;
// const dotenv = require('dotenv');
// dotenv.config();

cloudinary.config({
  cloud_name: "dop0bmqgh",
  api_key: "956134232937995",
  api_secret: "0FwRFeec1y_O2Jl4BFlSI3Z5UwU",
});

module.exports = cloudinary;
