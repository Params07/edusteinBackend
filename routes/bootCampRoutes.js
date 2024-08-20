
const express = require('express');
const multer = require('multer');

const path = require('path');
const fs = require('fs');
const pool = require('../db');
const router = express.Router();
const upload = multer();


router.post('/updateBootcamp', upload.none(),  async (req, res) => {
  console.log(req.body); 

  const { id, title, startDate, endDate, additionalInfo, image_path, amount } = req.body;
  console.log(image_path)
  console.log(title)
  try {
    await pool.query(
      'UPDATE bootcamps SET title = $1, start_date = $2, end_date = $3, additional_info = $4, image_path = $5, amount = $6 WHERE id = $7',
      [title, startDate, endDate, additionalInfo, image_path, amount, id]
    );
    res.send('successfully updated');
  } catch (error) {
    console.error('Error inserting data into the database:', error);
    res.status(500).send('Error inserting data into the database');
  }
});

router.post('/deleteBootcamp', async (req, res) => {
  const { id } = req.body;
  try {
    await pool.query('DELETE FROM bootcamps WHERE id = $1', [id]);
    res.send('deleted');
  } catch (error) {
    res.status(500).send('error occurred');
    console.error(error);
  }
});

router.post('/addBootcamp', upload.none(), async (req, res) => {
  const { title, startDate, endDate, additionalInfo, image_path,amount } = req.body;

  
  try {
    const result = await pool.query(
      'INSERT INTO bootcamps (title, start_date, end_date, additional_info, image_path, amount) VALUES ($1, $2, $3, $4, $5, $6) RETURNING id',
      [title, startDate, endDate, additionalInfo,image_path, amount]
    );
    res.send({ id: result.rows[0].id });
  } catch (error) {
    console.error('Error inserting data into the database:', error);
    res.status(500).send('Error inserting data into the database');
  }
});

router.get('/bootcamp', async (req, res) => {
   const {id} = req.query;
   console.log(id)
   if (id == null || id == undefined ){
    return  res.status(500).send('Error fetching data from the database');
   }
  let query = 'SELECT id, title , registration_status FROM bootcamps ORDER BY id DESC';
  let params = []
  if(id!=0){
    params.push(id);
    query="SELECT * FROM bootcamps WHERE id = $1 "
  }
 
  try {
    const result = await pool.query(query,params);
    res.status(200).json(result.rows);
  } catch (error) {
    console.error('Error fetching data from the database:', error);
    res.status(500).send('Error fetching data from the database');
  }
});
router.post('/openRegistration', async (req, res) => {
  const { id } = req.body;
  if(id == null || id == undefined || id == 0){
    return  res.status(500).send('Could not fulfill the action requested');
  }
  try {
    await pool.query('UPDATE bootcamps SET registration_status = true WHERE id = $1', [id]);
    res.status(200).send('Registration opened');
  } catch (error) {
    console.error('Error opening registration:', error);
    res.status(500).send('Could not fulfill the action requested');
  }
});

router.post('/closeRegistration', async (req, res) => {
  const { id } = req.body;
  if(id == null || id == undefined || id == 0){
    return  res.status(500).send('Could not fulfill the action requested');
  }
  try {
    await pool.query('UPDATE bootcamps SET registration_status = false WHERE id = $1', [id]);
    res.status(200).send('Registration closed');
  } catch (error) {
    console.error('Error closing registration:', error);
    res.status(500).send('Could not fulfill the action requested');
  }
});


module.exports = router;
