
const express = require('express');
const {pool} = require('../db');
const { format } = require('date-fns');
const router = express.Router();



router.get('/registrations', async (req, res) => {
  const { bootcampId } = req.query;
  console.log(bootcampId);
  if (bootcampId == undefined || bootcampId == null){
    return res.status(500).json({ error: 'Internal Server Error' });
  }
  if (bootcampId == 0 ){
    return res.status(500).json({message:'no data for your request'});
  }
  
  try {
    const result = await pool.query('SELECT id ,name,email,phone,created_at FROM registrations WHERE bootcamp_id = $1', [bootcampId]);
    const formattedResults = result.rows.map(row => ({
      ...row,
      created_at: format(new Date(row.created_at), 'yyyy-MM-dd HH:mm:ss')
    }));
    res.status(201).json(formattedResults);
  } catch (error) {
    console.error('Error inserting data', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});
 router.get('/getemails',async(req,res)=>{
  
  const {bootcampIds} = req.query;
  if (bootcampIds == undefined || bootcampIds == null){
    return res.status(500).json({ error: 'Internal Server Error' });
  }
  const idsArray = bootcampIds.split(',').map(id => parseInt(id.trim())).filter(Boolean);
  
  if (idsArray.length === 0) {
    return res.status(400).json({ error: 'Invalid bootcamp IDs provided' });
  }
  
  try {
    const result = await pool.query(`SELECT DISTINCT email FROM registrations WHERE bootcamp_id IN (${idsArray.join(',')})`);
    console.log(result.rows);
    res.status(200).send(result.rows);

  } catch (error) {
     console.log(error);
  }
  
 })

module.exports = router;
