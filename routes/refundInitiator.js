const express = require('express');
const {pool} = require('../db');
const multer = require('multer');
const upload = multer();
const { body, validationResult } = require('express-validator');
const { sendEmail } = require('../emailsender');
const Razorpay = require('razorpay');
const router = express.Router();

const sendMail = async (emailData) => {
    const mailOptions = {
        to: emailData.email,
        subject: 'Your refund process has been initiated',
        html: `<pre>Hello ${emailData.name},

Your refund process has been successfully initiated.
You can check your refund status using Payment ID: ${emailData.razorPayID} through the Razorpay website.

Best regards,
Your Company Name
</pre>`,
    };
    await sendEmail(mailOptions);
}

const razorpayInstance = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_KEY_SECRET,
});

const getData = async(queryParameters)=>{
    let getdataQuery =`SELECT pd.id, rd.name, rd.phone, rd.email, pd.paymentid
     FROM registrations AS rd JOIN paymentdetails AS pd ON pd.id = rd.id
      WHERE  `
      let queryParams = []
      if(Array.isArray(queryParameters)){
        const placeholders = queryParameters.map((_, index) => `$${index + 1}`).join(', ');
        getdataQuery+=`  rd.bootcamp_id IN (${placeholders})`
        queryParams = queryParameters
      }else{
        getdataQuery +='  pd.paymentid = $1';
        queryParams.push(queryParameters)
      }

     
        const result = await pool.query(getdataQuery,
            queryParams
        );
        
        return result
       
  
}
router.get('/checkData', async (req, res) => {
    const { razorPayID } = req.query;
    if (!razorPayID) {
        return res.status(400).send({ message: 'razorPayID is required' });
    }
    try {
        const result = await getData(razorPayID);
        if (result.rows.length === 0) {
            return res.status(404).send({ message: 'No data found for the provided Payment ID' });
        }
      return  res.status(200).send(result.rows);
    } catch (error) {
        console.error('Error occurred while fetching data using Payment ID:', error);
       return res.status(500).send({ message: 'Internal Server Error' });
    }
    

   
});

router.get('/getData',async(req,res)=>{
    const {bootcampIds} = req.query;
    console.log(bootcampIds)
    if(bootcampIds === undefined || bootcampIds == null){
        return res.status(400).send({ message: 'bootcampid is required' });
    }
    let idArray = [];
    if (typeof bootcampIds === 'string') {
        idArray = bootcampIds.split(','); 
    } else if (Array.isArray(bootcampIds)) {
        idArray = bootcampIds; 
    }
    
    try {
        const result = await getData(idArray);
        if (result.rows.length === 0) {
            return res.status(404).send({ message: 'No data found for the provided bootcampId' });
        }
      return  res.status(200).send(result.rows);
    } catch (error) {
        console.error('Error occurred while fetching data using bootcamp id:', error);
       return res.status(500).send({ message: 'Internal Server Error' });
    }
})
router.post('/refundInitiate', upload.none(),
    body('razorPayID').isString().trim().notEmpty(),
    body('email').isEmail().normalizeEmail(),
    body('name').isString().trim().notEmpty(),
    body('phone').isString().trim().notEmpty(),
    body('id').isString().trim().notEmpty(),
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { razorPayID, email, id, name, phone } = req.body;
        
        try {
           
            const refundResponse = await razorpayInstance.payments.refund(razorPayID);
            console.log('Refund issued:', refundResponse);

            const emailData = { email, name, razorPayID };
            await sendMail(emailData);

            const client = await pool.connect();
            try {
                await client.query('BEGIN');
                const refundQuery = `
                    INSERT INTO refunds (payment_id, refund_id, amount, status, email, phone)
                    VALUES ($1, $2, $3, $4, $5, $6)
                `;
                const refundValues = [
                    razorPayID, 
                    refundResponse.id, 
                    refundResponse.amount, 
                    refundResponse.status, 
                    email, 
                    phone
                ];

                await client.query(refundQuery, refundValues);

                const updateRegistrations = 'DELETE FROM registrations WHERE id = $1';
                await client.query(updateRegistrations, [id]);

                await client.query('COMMIT');
                res.status(200).send({ message: 'Refund initiated successfully' });
            } catch (dbError) {
                await client.query('ROLLBACK');
                console.error('Error occurred while updating the database:', dbError);
                res.status(500).send({ message: 'Refund initiated but error occurred while updating the database' });
            } finally {
                client.release();
            }
        } catch (error) {
            console.error('Error occurred:', error);
            const errorMessage = error.error?.description || error.message || 'An unknown error occurred';
            res.status(500).send({ message: errorMessage });
        }
    }
);
router.post('/refundInitiateAll',upload.none(), async (req, res) => {
    const { userDetails } = req.body;
    console.log(userDetails)
    if (!Array.isArray(userDetails) || userDetails.length === 0) {
        return res.status(400).send({ message: 'No user details provided' });
    }

    const client = await pool.connect();
    const refundRecords = [];  
    
    try {
        await client.query('BEGIN');

        const refundPromises = userDetails.map(async (user) => {
            const { razorPayID, email, id, name, phone } = user;
            const refundRecord = { id,email,name,phone,razorPayID, status: 'pending' };
            
            try {
                
                if (!razorPayID || !email || !id || !name || !phone) {
                    throw new Error('Missing required user details');
                }

                
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (!emailRegex.test(email)) {
                    throw new Error('Invalid email format');
                }

               
                const refundResponse = await razorpayInstance.payments.refund(razorPayID);

            
                const emailData = { email, name, razorPayID };
                await sendMail(emailData);

               
                const refundQuery = `
                    INSERT INTO refunds (payment_id, refund_id, amount, status, email, phone)
                    VALUES ($1, $2, $3, $4, $5, $6)
                `;
                const refundValues = [
                    razorPayID,
                    refundResponse.id,
                    refundResponse.amount,
                    refundResponse.status,
                    email,
                    phone
                ];
                await client.query(refundQuery, refundValues);

                
                const updateRegistrations = 'DELETE FROM registrations WHERE id = $1';
                await client.query(updateRegistrations, [id]);

               
                refundRecord.status = 'success';
                return refundRecord;
            } catch (error) {
                
                refundRecord.status = 'failed';
                refundRecord.message = error.message || error.error.description;
                console.error(`Error processing refund for ${razorPayID}:`, error);
                return refundRecord;
            }
        });

        
        const results = await Promise.all(refundPromises);

       
        await client.query('COMMIT');
        res.status(200).send({ message: 'Bulk refund process completed', results });
    } catch (error) {
        
        await client.query('ROLLBACK');
        console.error('Error in bulk refund process:', error);
        res.status(500).send({ message: 'Bulk refund process failed', error: error.message });
    } finally {
        client.release();
    }
});
module.exports = router;
