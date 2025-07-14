const User = require("../MongoDB/model");
const transport = require('../Config/nodemailer');

const forgetPassword = async (req, res) => {
  const { email } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User Not Found" });
    }

    const otp = Math.floor(100000 + Math.random() * 900000);
    user.otp = otp;
    await user.save();

    const mailOptions = {
      from: "sahilsaini22001@gmail.com",
      to: email,
      subject: "Your OTP for Verification",
      html: `<p>Your OTP Code is ${otp}</p>`,
    };

    await transport.sendMail(mailOptions);

    return res.status(200).json({ success: true, message: "OTP send to your email" });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, message: "Internal Server Error" });
  }
};

module.exports = forgetPassword;
