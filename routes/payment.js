require('dotenv').config();
const express = require('express');
const Razorpay = require('razorpay');
const crypto = require('crypto');
const pool = require('../db');
const { sendEmail } = require('../emailsender');
const router = express.Router();


const sendMail =async (to, success) => {
  const mailOptions = {
    to: to,
    subject: success?'Payment Confirmation for EduStein Bootcamp Registration':'Issue with EduStein Bootcamp Registration',
    html: '',
  };

  if (success) {
    mailOptions.html = `
      <p>Dear Participant,</p>
      <p>We are pleased to inform you that your payment and registration for the EduStein Bootcamp has been successfully processed.</p>
     
      <p>Thank you for registering with us! We look forward to seeing you at the event.</p>
      <p>Best regards,</p>
      <p>The EduStein Team</p>
    `;
  } else {
    mailOptions.html = `
      <p>Dear Participant,</p>
      <p>We regret to inform you that there was an issue processing your payment for the EduStein Bootcamp registration.</p>
      <p>Please try again, or contact our support team if you continue to experience issues.</p>
      <p>If your payment was deducted, the amount will be refunded to your account shortly.</p>
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
router.post('/freeRegistration',validateRequest,async (req,res)=>{
  const {
   
    name,
    email,
    phone,
    bootcampId,
    
} = req.body;
   try {
    const registrationQuery = `
    INSERT INTO registrations (name, email, phone, bootcamp_id)
    VALUES ($1, $2, $3, $4)
    
`;
const registrationValues = [name, email, phone, bootcampId];

const registrationResult = await pool.query(registrationQuery, registrationValues);
res.status(201).json({message:'Registration completed!'});
sendMail(email,true);
} catch (error) {
  console.error('error occured',error)
  res.status(500).json({ error: 'Registration failed,Try again later' });
   
   }
})
router.post('/orders', async (req, res) => {
   

    const {id} = req.query;
    
  try {
    const instance = new Razorpay({
      key_id: process.env.RAZORPAY_KEY_ID,
      key_secret: process.env.RAZORPAY_KEY_SECRET,
    });
    
   
    const options = {
      amount: 50000,
      currency: 'INR',
      receipt: generateReceiptId(),
    };
    try {
        const result = await pool.query('SELECT amount FROM bootcamps WHERE id = $1',[id]);
        console.log(result.rows[0].amount)
        options.amount = result.rows[0].amount * 100;
        if(options.amount === 0){
          res.status(201).send({amount:options.amount,id:id,currency:options.currency});
        }else{
          const order = await instance.orders.create(options);
    
          if (!order){
              console.log(order);
              return res.status(500).send('Some error occurred');
          } 
      
          res.json(order);
        }
        
       
      } catch (error) {
        console.error('Error ', error); 
        
      }
   
  } catch (error) {
    console.log(error)
    res.status(500).send(error);
  }
});

router.post('/success',validateRequest, async (req, res) => {
    const {
        orderCreationId,
        razorpayPaymentId,
        razorpayOrderId,
        razorpaySignature,
        name,
        email,
        phone,
        bootcampId,
    } = req.body;

    const client = await pool.connect();

    try {
        await client.query('BEGIN');

        const shasum = crypto.createHmac('sha256', process.env.RAZORPAY_KEY_SECRET);
        shasum.update(`${orderCreationId}|${razorpayPaymentId}`);
        const digest = shasum.digest('hex');

        if (digest !== razorpaySignature) {
            return res.status(400).json({ error: 'Invalid signature' });
        }
        const registrationQuery = `
        INSERT INTO registrations (name, email, phone, bootcamp_id)
        VALUES ($1, $2, $3, $4)
        RETURNING id
    `;
    const registrationValues = [name, email, phone, bootcampId];

    const registrationResult = await client.query(registrationQuery, registrationValues);
    const paymentId = registrationResult.rows[0].id;

        const paymentQuery = `
            INSERT INTO PaymentDetails (id,orderId, paymentId, signature, success)
            VALUES ($1, $2, $3, $4,$5)
            
        `;
        const paymentValues = [paymentId,razorpayOrderId, razorpayPaymentId, razorpaySignature, true];

        const paymentResult = await client.query(paymentQuery, paymentValues);
        

        

        await client.query('COMMIT');

        res.status(201).json({message:'Registration completed!'});
        sendMail(email,true)
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
            const refundValues = [razorpayPaymentId, refundResponse.id, refundResponse.amount, refundResponse.status,email,phone];

            await client.query(refundQuery, refundValues);

            res.status(500).json({ error: 'Registration failed, payment refunded', refund: refundResponse });
            sendMail(email,false)
        } catch (refundError) {
          sendMail(email,false)
            console.error('Error issuing refund:', refundError);
            res.status(500).json({ error: 'Registration failed, refund also failed', registrationError, refundError });
        }
    } finally {
        client.release();
    }
});
module.exports = router;
