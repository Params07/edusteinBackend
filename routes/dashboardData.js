const express = require('express');
const pool = require('../db');
const router = express.Router();
const { format, endOfMonth, startOfMonth, eachMonthOfInterval, parseISO } = require('date-fns');

router.get('/chartdata', async (req, res) => {
    const { id, start_date, end_date } = req.query;
    if (
      id === undefined ||
      start_date === undefined ||
      end_date === undefined ||
      isNaN(new Date(start_date).getTime()) ||
      isNaN(new Date(end_date).getTime())
    ) {
      return res.status(400).send({ message: "Invalid query parameters" });
    }
  let query = `
    SELECT
      DATE_TRUNC('month', rd.created_at) AS month,
      SUM(bc.amount) AS total_amount
    FROM registrations AS rd
    JOIN bootcamps AS bc ON rd.bootcamp_id = bc.id
  `;
  let queryParams = [];

  if (!id) {
    return res.status(400).send({ message: "ID is required" });
  } else if (id === 'all') {
    query += " WHERE rd.created_at >= $1 AND rd.created_at <= $2 ";
  } else {
    const bootcampId = Number(id);
   
    if (isNaN(bootcampId)) {
      return res.status(400).send({ message: "Invalid bootcamp ID" });
    }

    query += " WHERE rd.bootcamp_id = $1 AND rd.created_at >= $2 AND rd.created_at <= $3 ";
    queryParams.push(bootcampId);
  }

  query += `
    GROUP BY month
    ORDER BY month DESC
  `;

  try {
    const formattedStartDate = format(new Date(start_date), 'yyyy-MM-dd');
    const formattedEndDate = endOfMonth(new Date(end_date),'yyyy-MM-dd');

   
      queryParams.push(formattedStartDate, formattedEndDate);
 

    const result = await pool.query(query, queryParams);

   
   
    
    const formattedResult = result.rows.map(row => ({
      month: format(new Date(`${row.month}-01`), 'MMM yyyy'),
      total_amount: row.total_amount,
    }));

   
   

    res.status(200).send(formattedResult);
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: "Server error" });
  }
 });
 router.get('/piechartdata', async (req, res) => {
  const { start_date, end_date } = req.query;
  if (
   
    start_date === undefined ||
    end_date === undefined ||
    isNaN(new Date(start_date).getTime()) ||
    isNaN(new Date(end_date).getTime())
  ) {
    return res.status(400).send({ message: "Invalid query parameters" });
  }
  
let query = `
  select bc.title as name , COUNT(rd.id) as value from registrations as rd join bootcamps as bc on rd.bootcamp_id = bc.id 
  WHERE rd.created_at >= $1 AND rd.created_at <= $2
   group by bc.id
`;
let queryParams = [];



try {
  const formattedStartDate = format(new Date(start_date), 'yyyy-MM-dd');
  const formattedEndDate = endOfMonth(new Date(end_date),'yyyy-MM-dd');
    queryParams.push(formattedStartDate, formattedEndDate);
    const result = await pool.query(query, queryParams);
   res.status(200).send(result.rows);
} catch (error) {
  console.error(error);
  res.status(500).send({ message: "Server error" });
}
});




 
 router.get('/registration', async (req, res) => {
  const {id,start_date,end_date } = req.query;
  if (
    id === undefined ||
    start_date === undefined ||
    end_date === undefined ||
    isNaN(new Date(start_date).getTime()) ||
    isNaN(new Date(end_date).getTime())
  ) {
    return res.status(400).send({ message: "Invalid query parameters" });
  }
   console.log()
   let query = "SELECT COUNT(*) AS tot FROM registrations ";
   let queryParams = [];
 
   if (!id) {
     return res.status(400).send({ message: "ID is required" });
   } else if (id === 'all') {
     query += "WHERE created_at >= $1 AND created_at <= $2";
     queryParams.push(format(new Date(start_date), 'yyyy-MM-dd'));
     queryParams.push(format(endOfMonth(new Date(end_date)), 'yyyy-MM-dd'));
   } else {
     const bootcampId = Number(id);
     if (isNaN(bootcampId)) {
       return res.status(400).send({ message: "Invalid bootcamp ID" });
     }
 
     query += "WHERE bootcamp_id = $1 AND created_at >= $2 AND created_at <= $3";
     queryParams.push(bootcampId);
     queryParams.push(format(new Date(start_date), 'yyyy-MM-dd'));
     queryParams.push(format(endOfMonth(new Date(end_date)), 'yyyy-MM-dd'));
   }
 
   try {
     const result = await pool.query(query, queryParams);
     res.status(200).send(result.rows);
   } catch (err) {
     console.error(err);
     return res.status(500).send({ message: "Error retrieving data" });
   }
 });
 

 
module.exports = router;
