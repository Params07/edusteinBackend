const express = require('express');
const { pool } = require('../db');
const getPromoCode = require('../utils/getPromocode');
const { sendEmail } = require('../emailsender');
const {DISCOUNT_TYPES,PROMO_TYPES} = require('../utils/getAmount')


const router = express.Router();
const mailTemplate = async (mailOptions, expiration_date, promoCode) => {
    mailOptions.subject = 'you got new promocode for upcoming bootcamp'
    mailOptions.html = `
   <p> Dear user,</p>

<p>We hope this message finds you well! Thank you for your interest in our bootcamp programs. We are thrilled to inform you that you have been selected to receive exclusive promo codes that can help you on your learning journey.</p>
<p>Your Promo Code(s):${promoCode}</p>
<p>How to Use Your Promo Codes:</p>
<p>Visit our website: <a href="edustein.in">click her</a></p>
<p>Select the course you are interested in.
Enter your promo code during the checkout process to enjoy your discount!
Promo Code Validity:</p>

<p>These codes are valid until ${expiration_date}. Make sure to use them before they expire!</p>
<p>If you have any questions or need further assistance, feel free to reach out to us at edustein.in@gmail.com.</p>

<p>Thank you for being a part of our learning community. We wish you all the best in your educational journey!</p>

<p>Best regards,</p>
Edustein Team.`
await sendEmail(mailOptions);
}
router.post('/addNewPromoCode', async (req, res) => {
    const {
        promo_type,
        discount_type,
        discount_value,
        max_discount,
        bootcamp_id,
        emails,
        expiration_date,
        is_active
    } = req.body;

    if (!promo_type || !discount_type || discount_value == null || !expiration_date) {
        
        return res.status(400).json({ error: 'Missing required fields' });
    }

    if (discount_type === DISCOUNT_TYPES.UPTO_PERCENTAGE && max_discount == null) {
        return res.status(400).json({ error: 'Max discount is required for upto_and_percentage discount type' });
    }

    if ((promo_type === PROMO_TYPES.PARTICULAR_USERS || promo_type == PROMO_TYPES.PARTICULAR_USER_AND_BOOTCAMP) && !emails) {
       
        return res.status(400).json({ error: 'Emails are required for particular users promo type' });
    }

    if ((promo_type === PROMO_TYPES.PARTICULAR_BOOTCAMP || promo_type == PROMO_TYPES.PARTICULAR_USER_AND_BOOTCAMP) && !bootcamp_id) {
        
        return res.status(400).json({ error: 'Bootcamp ID is required for particular bootcamp promo type' });
    }

    const client = await pool.connect();

    try {
        await client.query('BEGIN'); // Start the transaction
        const promocode = await getPromoCode();
        const mailOptions = {};
        // Insert into promocodes table
        const result = await client.query(
            `INSERT INTO promocodes (code,promo_type, discount_type, discount_value, max_discount, expiration_date, is_active)
       VALUES ($1, $2, $3, $4, $5, $6, $7)
       RETURNING id`,
            [promocode, promo_type, discount_type, discount_value, max_discount, expiration_date, is_active]
        );

        const promoCodeId = result.rows[0].id;

        // If promo type is for particular users, insert emails into promousers
        if ((promo_type === PROMO_TYPES.PARTICULAR_USERS || promo_type == PROMO_TYPES.PARTICULAR_USER_AND_BOOTCAMP) && emails) {
            const emailList = emails.split(',').map(email => email.trim());

            for (const email of emailList) {
                await client.query(
                    `INSERT INTO promousers (promo_code_id, user_email)
           VALUES ($1, $2)`,
                    [promoCodeId, email]
                );
            }
           
            mailOptions.to = emails;
            
        }

        // If promo type is for a particular bootcamp, insert bootcamp ID into promobootcamp
        if ((promo_type === PROMO_TYPES.PARTICULAR_BOOTCAMP || promo_type == PROMO_TYPES.PARTICULAR_USER_AND_BOOTCAMP) && bootcamp_id) {
            const bootcampIds = bootcamp_id.split(',').map(id => id.trim());

            for (const id of bootcampIds) {
                // Insert each bootcamp_id into the promobootcamp table
                await client.query(
                    `INSERT INTO promobootcamps (promo_code_id, bootcamp_id)
                 VALUES ($1, $2)`,
                    [promoCodeId, id]
                );
            }
        }

        await client.query('COMMIT'); // Commit the transaction
        await mailTemplate(mailOptions, expiration_date, promocode);
        res.status(201).json({ message: 'Promo code added successfully', promoCodeId });
    } catch (error) {
        await client.query('ROLLBACK'); // Rollback the transaction on error
        console.error('Error adding promo code:', error);
        res.status(500).json({ error: 'Internal server error' });
    } finally {
        client.release(); // Release the client back to the pool
    }
});


router.get('/getPromoCodes',async(req,res)=>{
    try {
        const result = await pool.query('select * from promocodes order by expiration_date desc');
        res.status(201).send(result.rows);
    } catch (error) {
        console.log(error);
        res.status(400).send({error:'error occured'});
    }
})

router.post('/alterPromocode',async(req,res)=>{
    const {promocodeID} = req.body;
    if(promocodeID == null || promocodeID == undefined ){
        return res.status(500).send({error:"id is undefined or null"});
    }
    if(promocodeID == 0){
        return res.status(500).send({error:"id can't be zero"});
    }
    try {
        const result = pool.query('update promocodes set is_active = NOT is_active where id = $1',[promocodeID]);
        res.status(201).send({ message: 'updated success fully ' })
    } catch (error) {
        res.status(400).send({error:'error occured'})
        console.error(error);
    }
})

module.exports = router;
