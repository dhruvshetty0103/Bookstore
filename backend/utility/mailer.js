var nodemailer = require('nodemailer');
require('dotenv').config();

class nodeMailer{
  mailer = (email,token) =>{
    var transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL,
        pass: process.env.PASSWORD
      }
    });
    
    var mailOptions = {
      from: process.env.EMAIL,
      to: email,
      subject: 'Sending Email using Node.js',
      html: `<a href='http://localhost:3000/reset/${token}'>click here</a>`,
      text: "password reset"
    };
    
    return transporter
      .sendMail(mailOptions)
      .then((data) => {
        return "Email sent successfully!!";
      })
      .catch((err) => {
        throw err;
      });

  }
}


module.exports = new nodeMailer();