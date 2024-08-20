const express = require('express');
const pool = require('../db');

const router = express.Router();

router.get('/completed',async(req,res)=>{
    const { bootcamp_id } = req.query;
    console.log(bootcamp_id);
    let queryParams = [];
    let queryString = 'SELECT rd.id, rd.name, rd.email, rd.phone, bc.amount ' +
                       'FROM registrations AS rd ' +
                       'JOIN bootcamps AS bc ON rd.bootcamp_id = bc.id ';
    
   
    if (bootcamp_id && bootcamp_id !== 'all' && parseInt(bootcamp_id) > 0) {
      queryString += 'WHERE bc.id = $1 ';
      queryParams.push(parseInt(bootcamp_id));
    } else if (bootcamp_id && bootcamp_id === 'all'){

    }
    
    else{
      return res.status(500).send({ message: "No data is found" });
    }
    
    
    queryString += 'ORDER BY rd.id DESC';
    
    try {
      const result = await pool.query(queryString, queryParams);
      res.status(200).send(result.rows);
    } catch (err) {
      console.error(err);
      res.status(500).send({ message: 'An error occurred while fetching data' });
    }

})
router.get('/refund',async(req,res)=>{
    try {
      const result = await pool.query('select id,email,phone,payment_id,refund_id,amount from refunds order by id desc ')
         res.status(201).send(result.rows);
    } catch (error) {
      console.log(error);
      res.status(500).send({message:"error occured"});
    }
 })






module.exports = router;