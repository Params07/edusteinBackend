const express = require('express');
const { pool } = require('../db');
const { isNumber } = require('razorpay/dist/utils/razorpay-utils');
const validator = require('validator');
const { error } = require('winston');
const getPromocodes = require('../utils/getPromocodes');


const router = express.Router();
const isValidID = (id)=>{
  return id == null || id == undefined || !isNumber(id) || id !=0;
}
router.get('/bootcamp', async (req, res) => {
  const { id } = req.query;
  let query = 'SELECT * FROM bootcamps WHERE end_date >= CURRENT_TIMESTAMP and registration_status = true ';
  let queryParams = [];

  if (id > 0) {
    query = 'SELECT * FROM bootcamps WHERE id = $1 and end_date >= CURRENT_TIMESTAMP and registration_status = true';
    queryParams.push(id);
  }

  try {
    const result = await pool.query(query, queryParams);

    res.status(200).json(result.rows);
  } catch (error) {
    console.error('Error fetching data from the database:', error);
    res.status(500).send('Error fetching data from the database');
  }
});

router.get('/bootcampOption', async (req, res) => {
  try {
    const result = await pool.query('SELECT id,title,amount FROM bootcamps WHERE end_date >= CURRENT_TIMESTAMP and registration_status = true');
    
    res.status(200).json(result.rows);
  } catch (error) {
    console.error('Error fetching data from the database:', error);
    res.status(500).send('Error fetching data from the database');
  }
})

router.post('/registerCheck', async (req, res) => {
  const { email, bootcampId } = req.body;
  try {
    const result = await pool.query(
      'SELECT COUNT(*) FROM registrations WHERE email = $1 AND bootcamp_id = $2',
      [email, bootcampId]
    );
    res.status(201).json({ success: result.rows[0].count == 0 });
  } catch (error) {
    console.error('Error inserting data', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

router.get('/promocodes', async (req, res) => {
  const { bootcampId, email ,promocode} = req.query;
 
  const result = await getPromocodes(email,bootcampId,promocode);
  
  if("error" in result){
   return res.status(500).send(result);
  } 
  return res.status(200).send(result);

})



  module.exports = router;
