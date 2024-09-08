
const express = require('express');
const {pool} = require('../db');
const { format } = require('date-fns');
const router = express.Router();



router.get('/registrations', async (req, res) => {
  const { bootcampId } = req.query;
  if (bootcampId == undefined || bootcampId == null){
    return res.status(500).json({ error: 'Internal Server Error' });
  }
  if (bootcampId == 0 ){
    return res.status(500).json({message:'no data for your request'});
  }
  console.log(bootcampId)
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

module.exports = router;
