const nodemailer = require("nodemailer");

const transport = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "sahilsaini22001@gmail.com",
    pass: "rdjm hajj jbmf rley",
  },
});

module.exports = transport;