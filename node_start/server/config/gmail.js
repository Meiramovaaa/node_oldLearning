const nodemailer = require("nodemailer");

let transporter = nodemailer.createTransport({
    service:"gmail",
    host: "smtp.gmail.com",
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: "book.marketplace13@gmail.com", // generated ethereal user
      pass: "jblbprvzkhpbewdn", // generated ethereal password
    },
});

module.exports={
    transporter
}