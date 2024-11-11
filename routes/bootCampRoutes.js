
const express = require('express');
const multer = require('multer');

const path = require('path');
const fs = require('fs');
const {pool} = require('../db');
const { isNumber } = require('razorpay/dist/utils/razorpay-utils');
const { isBooleanObject } = require('util/types');

const router = express.Router();
const upload = multer();


router.post('/updateBootcamp', upload.none(),  async (req, res) => {
 

  const { id, title, startDate, endDate, additionalInfo, image_path, amount } = req.body;
  if(id == null || id == undefined ||  id <=0 || !isNumber(id)){
    return  res.status(500).send('Could not fulfill the action requested');
  }
  try {
    await pool.query(
      'UPDATE bootcamps SET title = $1, start_date = $2, end_date = $3, additional_info = $4, image_path = $5, amount = $6  WHERE id = $7',
      [title, startDate, endDate, additionalInfo, image_path, amount,id]
    );
    res.send('successfully updated');
  } catch (error) {
    console.error('Error inserting data into the database:', error);
    res.status(500).send('Error inserting data into the database');
  }
});

router.post('/deleteBootcamp', async (req, res) => {
  const { id } = req.body;
  if(id == null || id == undefined ||  id <=0 || !isNumber(id)){
    return  res.status(500).send('Could not fulfill the action requested');
  }
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
router.get('/bootcampById',async(req,res)=>{
  const {id} = req.query;
  if(id == null ||  id == undefined || !isNumber(id)){
    return    res.status(500).send('Could not fulfill the action requested');
  }
  fetchData(`select * from bootcamps ${id != 0 ?"where id = $1":""}`,id!=0?[id]:[],res);
})
router.get('/bootcamp', async (req, res) => {
  
   const {isBootcampActive} = req.query;
   
  let params = []
  const status = isBootcampActive === "true" ? true : isBootcampActive === "false" ? false : null;
  
  if (status !== null) {
    params.push(status);
  }
  fetchData(`SELECT id, title , registration_status FROM bootcamps ${status !== null?"where registration_status = $1":""} ORDER BY id DESC`,params,res)
  
  
});
router.post('/openRegistration', async (req, res) => {
  const { id } = req.body;
  if(id == null || id == undefined ||  id <=0 || !isNumber(id)){
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
  if(id == null || id == undefined ||  id <=0 || !isNumber(id)){
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



async function fetchData(query,params,res){
  
  try {
    const result = await pool.query(query,params);
    
    res.status(200).json(result.rows);
  } catch (error) {
    console.error('Error fetching data from the database:', error);
    res.status(500).send('Error fetching data from the database');
  }
}


module.exports = router;
