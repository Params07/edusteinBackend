require('dotenv').config();
const nodemailer = require('nodemailer');
const fs = require('fs');
const path = require('path');

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
  mailOptions.from = process.env.gmail_user_name;
  if (mailOptions.to) {
    mailOptions.bcc = Array.isArray(mailOptions.to) 
      ? mailOptions.to.join(', ') 
      : mailOptions.to;
    delete mailOptions.to; 
  }
 
  try {
    const info = await transporter.sendMail(mailOptions);
    
  } catch (error) {
    console.error('Error sending email:', error);
  } finally {
    if (mailOptions.attachments && mailOptions.attachments.length > 0) {
      await Promise.all(
        mailOptions.attachments.map(file => {
          return new Promise((resolve, reject) => {
            fs.unlink(path.join(__dirname, 'uploads', file.oldfilename), err => {
              if (err) {
                console.error(`Error deleting file ${file.oldfilename}:`, err);
                reject(err);
              } else {
                console.log(`File ${file.filename} deleted successfully.`);
                resolve();
              }
            });
          });
        })
      );
    }
  }
};

module.exports = { sendEmail };
