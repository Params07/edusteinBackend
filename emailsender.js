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
 mailOptions.from = process.env.gmail_user_name
  try {
    const info = await transporter.sendMail(mailOptions);
    console.log('Email sent: %s', info.messageId);
  } catch (error) {
    console.error('Error sending email:', error);
  }
  finally{
    
    if ( mailOptions.attachments &&  mailOptions.attachments > 0) {
           mailOptions.attachments.forEach(file => {
        fs.unlink(path.join(__dirname, 'uploads', file.filename), err => {
          if (err) logger.error(`Error deleting file ${file.filename}:`, err);
        });
      });
    }
  }
};

module.exports  = {sendEmail}
