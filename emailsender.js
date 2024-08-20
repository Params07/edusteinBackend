require('dotenv').config();
const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.gmail_user_name,
    pass: process.env.gmail_user_password, 
  },
  tls: {
    rejectUnauthorized: false, 
  },
  
});

const sendEmail = async (mailOptions) => {
 mailOptions.from = 'edustein010@gmail.com'
  try {
    const info = await transporter.sendMail(mailOptions);
    console.log('Email sent: %s', info.messageId);
  } catch (error) {
    console.error('Error sending email:', error);
  }
};

module.exports  = {sendEmail}
