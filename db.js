require('dotenv').config();
const { Pool } = require('pg');
const { Sequelize } = require('sequelize');

const sequelize = new Sequelize(process.env.DATABASE_URL, {
  dialect: 'postgres',
  protocol: 'postgres',
  logging: false,  
 
  dialectOptions: {
    dialectOptions: {
      ssl: false, 
    }
  }
});


sequelize.authenticate()
  .then(() => {
    console.log('Connection to the database has been established successfully.');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });


const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: false,
});
 module.exports ={pool,sequelize};