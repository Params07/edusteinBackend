require('dotenv').config();
const express = require('express');
const Razorpay = require('razorpay');
const crypto = require('crypto');
const { pool } = require('../db');
const { sendEmail } = require('../emailsender');

const {ApplyDiscount} = require('../utils/getAmount');
const getPromocodes = require('../utils/getPromocodes');

const router = express.Router();


const sendMail = async (emailData) => {
  const mailOptions = {
    to: emailData.email,
    subject: emailData.status
      ? 'Registration Completed for Your Upcoming Session on'
      : emailData.refundFailed
        ? 'Refund Issue for EduStein Bootcamp Registration'
        : 'Issue with EduStein Bootcamp Registration',
    html: '',
  };

  if (emailData.status) {
    mailOptions.html = `
      <p>Dear ${emailData.name},</p>
        <p>Thank you for registering the ${emailData.title} Session with Edustein! We're excited to help you on your career journey.</p>
        <p>We will share the meeting link for your scheduled session on the session day. Please make yourself available at the scheduled time to make the most out of this opportunity.</p>
        <p>If you have any questions or need further assistance, feel free to reach out to us at via edustein.in@gmail.com or Message EduStein on WhatsApp https://wa.me/message/2KDSO547CF5WF1.</p>
        <p>Looking forward to connecting with you soon!</p>

<p>Thanks,</p>
<p>Edustein Team</P>
    `;
  } else if (emailData.refundFailed) {
    mailOptions.html = `
      <p>Dear Participant,</p>
      <p>We regret to inform you that there was an issue processing the refund for your EduStein Bootcamp registration.</p>
      <p>Please contact EduStein support with your payment ID ${emailData.razorpayPaymentId} for assistance with your refund.</p>
      <p>Best regards,</p>
      <p>The EduStein Team</p>
    `;
  } else {
    mailOptions.html = `
      <p>Dear Participant,</p>
      <p>We regret to inform you that there was an issue processing your payment for the EduStein Bootcamp registration.</p>
      <p>Your refund process has been initiated.</p>
      <p>You can track your refund status using this payment ID ${emailData.razorpayPaymentId} on the Razorpay website.</p>
      <p>Best regards,</p>
      <p>The EduStein Team</p>
    `;
  }

  await sendEmail(mailOptions);
};


const validateRequest = (req, res, next) => {
  const { name, email, phone, bootcampId } = req.body;

  if (!name || !email || !phone || !bootcampId) {
    return res.status(400).json({ error: 'All fields are required: name, email, phone, bootcampId' });
  }



  next();
};
const generateReceiptId = () => {
  const now = new Date();
  const timestamp = now.toISOString().replace(/[-:.]/g, '');
  return `receipt_${timestamp}`;
};
router.post('/freeRegistration', validateRequest, async (req, res) => {
  const {

    name,
    email,
    phone,
    bootcampId,
    title

  } = req.body;
  
  const emailData = {};
  emailData.title = title;
  
  emailData.status = true;
  emailData.name = name;
  try {
    const registrationQuery = `
    INSERT INTO registrations (name, email, phone, bootcamp_id)
    VALUES ($1, $2, $3, $4)
    
`;
    const registrationValues = [name, email, phone, bootcampId];

     await pool.query(registrationQuery, registrationValues);
    res.status(201).json({ message: 'Registration completed!' });
    sendMail(emailData, true);
  } catch (error) {
    console.error('error occured', error)
    res.status(500).json({ error: 'Registration failed,Try again later' });

  }
})
router.post('/orders', async (req, res) => {


  const { email,bootcampId ,promocodeId} = req.body;
  

  try {
    const instance = new Razorpay({
      key_id: process.env.RAZORPAY_KEY_ID,
      key_secret: process.env.RAZORPAY_KEY_SECRET,
    });


    const options = {
      amount: 0,
      currency: 'INR',
      receipt: generateReceiptId(),
    };
    try {
      
      const result = await pool.query('SELECT amount,title FROM bootcamps WHERE id = $1', [bootcampId]);
     
      if (result.rows[0].amount === 0) {
        res.status(201).send({ amount: options.amount, id: bootcampId, currency: options.currency });
      } else {
        const promocode = await getPromocodes(email,bootcampId,promocodeId);
        
        if("error" in promocode){
         
          return res.status(500).send(promocode);
        }
        const value = ApplyDiscount(promocode[0],result.rows[0].amount);
      
        options.amount =  Math.round(value)*100;
        
        if( options.amount == 0){
          return  res.status(201).send({ amount: options.amount, id: id, currency: options.currency });
        }
        const order = await instance.orders.create(options);

        if (!order) {
         
          return res.status(500).send('Some error occurred');
        }

        res.json(order);
      }


    } catch (error) {
      console.error('Error ', error);
         res.status(500).send(error)
    }

  } catch (error) {
    console.log(error)
    res.status(500).send(error);
  }
});

router.post('/success', validateRequest, async (req, res) => {
  const {
    orderCreationId,
    razorpayPaymentId,
    razorpayOrderId,
    razorpaySignature,
    name,
    email,
    phone,
    bootcampId,
    promocodeId,
    title
  } = req.body;

  const client = await pool.connect();
  const emailData = {};
  emailData.email = email;
  emailData.title = title;
 
  emailData.razorpayPaymentId = razorpayPaymentId;
  emailData.name = name;

  try {
    await client.query('BEGIN');

    const shasum = crypto.createHmac('sha256', process.env.RAZORPAY_KEY_SECRET);
    shasum.update(`${orderCreationId}|${razorpayPaymentId}`);
    const digest = shasum.digest('hex');

    if (digest !== razorpaySignature) {
      return res.status(400).json({ error: 'Invalid signature' });
    }
    const registrationQuery = `
        INSERT INTO registrations (name, email, phone, bootcamp_id,promocode_id )
        VALUES ($1, $2, $3, $4,$5)
        RETURNING id
    `;
    const registrationValues = [name, email, phone, bootcampId,promocodeId];

    const registrationResult = await client.query(registrationQuery, registrationValues);
    const paymentId = registrationResult.rows[0].id;

    const paymentQuery = `
            INSERT INTO PaymentDetails (id,orderId, paymentId, signature, success)
            VALUES ($1, $2, $3, $4,$5)
            
        `;
    const paymentValues = [paymentId, razorpayOrderId, razorpayPaymentId, razorpaySignature, true];

    await client.query(paymentQuery, paymentValues);
     await client.query('COMMIT');

    res.status(201).json({ message: 'Registration completed!' });
    emailData.status = true
  } catch (registrationError) {
    await client.query('ROLLBACK');
    console.error('Error inserting registration:', registrationError);


    try {
      const razorpayInstance = new Razorpay({
        key_id: process.env.RAZORPAY_KEY_ID,
        key_secret: process.env.RAZORPAY_KEY_SECRET,
      });

      const refundResponse = await razorpayInstance.payments.refund(razorpayPaymentId);
      console.log('Refund issued:', refundResponse);


      const refundQuery = `
                INSERT INTO refunds (payment_id, refund_id, amount, status,email,phone)
                VALUES ($1, $2, $3, $4,$5,$6)
            `;
      const refundValues = [razorpayPaymentId, refundResponse.id, refundResponse.amount, refundResponse.status, email, phone];

      await client.query(refundQuery, refundValues);

      res.status(500).json({ error: 'Registration failed, payment refunded', refund: refundResponse });
      emailData.status = false
    } catch (refundError) {
      emailData.status = false;
      emailData.refundFailed = true;
      console.error('Error issuing refund:', refundError);
      res.status(500).json({ error: 'Registration failed, refund also failed', registrationError, refundError });
    }
  } finally {
    sendMail(emailData)
    client.release();
  }
});
module.exports = router;
