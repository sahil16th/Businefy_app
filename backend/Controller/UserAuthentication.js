const User = require("../MongoDB/model");
const bcrypt = require("bcryptjs");
const nodemailer = require("nodemailer");
const jwt = require("jsonwebtoken");

const transport = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "sahilsaini22001@gmail.com",
    pass: "rdjm hajj jbmf rley",
  },
});

const newUser = async (req, res) => {
  const { email, password } = req.body;
  console.log(email, " ", password);

  try {
    const username = email.split("@")[0];
    const hashPassword = await bcrypt.hash(password, 10);
    console.log(username, " ", hashPassword);

    const otp = Math.floor(100000 + Math.random() * 900000);
    const user = await User.findOne({ email });
    if(user && user.isVerified == true) {
      return res.status(401).json({ success: false, message: "email already exist"});
    }
    if (user && user.isVerified == false) {
      user.password = hashPassword;
      user.otp = otp;
      await user.save();
    } else {
      await User.create({
        username,
        email: email.toLowerCase(),
        password: hashPassword,
        otp,
      });
    }

    const mailOptions = {
      from: "sahilsaini22001@gmail.com",
      to: email,
      subject: "Your OTP for Verification",
      html: `<p>Your OTP Code is ${otp}</p>`,
    };

    await transport.sendMail(mailOptions);

    return res.status(201).json({ success: true, message: "Register Successfully", user });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;
  console.log(email)
  const mail = email.toLowerCase();

  try {
    const user = await User.findOne({ email: mail });
    if (!user || user.isVerified == false) {
      return res.status(404).json({ success: false, message: "User Not Found" });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(401).json({ success: false, message: "Wrong Password" });
    }

    const token = jwt.sign({ id: user._id }, "Sahil123//", {
      expiresIn: "24hr",
    });

    return res
      .status(201)
      .json({ success: true, message: "Login Successfully", AuthToken: token });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ success:false, message: "Internal Server Error" });
  }
};

const isVerified = async (req, res) => {
  const { email, otp } = req.body;
  console.log(email," ",otp)
  try {
    if(!email) {
      return res.status(400).json({ message: "email not found"})
    }
    const user = await User.findOne({ email });
    if (otp == user.otp) {
      user.isVerified = true;
      await user.save();
    } else {
      return res.status(400).json({ message: "OTP is Invalid "})
    }

    const mailOptions = {
      from: "sahilsaini22001@gmail.com",
      to: email,
      subject: "Welcome to Businefy Community!",
      html: `<p>Welcome to Businefy <a href='/login'>Login Now</a></p>`,
    };

    await transport.sendMail(mailOptions);

    return res.status(200).json({ success: true, message: "Verification successful" });
  } catch (error) {
    return res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

const verifyToken = async (req, res) =>{
  const { token } = req.body;
  
  try{
    const decoded = jwt.verify(token, "Sahil123//");
    const user = await User.findById(decoded.id);
    return res.status(200).json({ success: true, username: user.username }); 
  } catch(error) {
    return res.status(500).json({ success: false });
  }
}

const changePassword = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });

    if(!user) {
      return res.status(404).json({ success: false, message: "User Not Found"});
    }

    const hashPassword = await bcrypt.hash(password, 10);

    user.password = hashPassword;
    await user.save();

    return res.status(200).json({ success: true, message: "Password Updated Successfully" });
  } catch (error) {
    return res.status(500).json({ success: false, messge: "Internal Server Error"});
  }
}

module.exports = { newUser, login, isVerified, verifyToken, changePassword };