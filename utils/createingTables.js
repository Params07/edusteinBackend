const { Sequelize, DataTypes } = require('sequelize');
const fs = require('fs');
const path = require('path');
const tableSchema = require('./table.json');
const { sequelize } = require('../db.js');
const enums = {
  promo_type: [
    "for_particular_bootcamp",
    "anyone",
    "valid_for_particular_users",
    "valid_for_bootcamp_and_user"

  ],
  discount_type: [
    "flat",
    "percentage",
    "upto_and_percentage"
  ],
  
};
const getSequelizeType = (field) => {
  switch (field.type) {
    case 'INTEGER': return DataTypes.INTEGER;
    case 'STRING': return DataTypes.STRING;
    case 'TEXT': return DataTypes.TEXT;
    case 'DATE': return DataTypes.DATE;
    case 'BOOLEAN': return DataTypes.BOOLEAN;
    case 'ENUM': return DataTypes.ENUM(...enums[field.enumName]);
    default: return DataTypes.STRING;
  }
};

const createTable = async () => {
  for (const tableName of Object.keys(tableSchema)) {
    
    const tableDef = tableSchema[tableName];
    const attributes = {};
    

    for (const fieldName of Object.keys(tableDef.fields)) {
      const field = tableDef.fields[fieldName];
      
     
      attributes[fieldName] = {
        type: getSequelizeType(field),
        allowNull: field.allowNull || false,
        primaryKey: field.primaryKey || false,
        autoIncrement: field.autoIncrement || false,
        defaultValue: field.defaultValue === 'NOW' ? Sequelize.NOW : field.defaultValue || undefined
      };
    }
       
    const options = tableDef.options || {};
    options.timestamps = false; 

    sequelize.define(tableName, attributes, options);
  }

  await sequelize.sync({ force: false });
  console.log('All tables were synchronized successfully.');
};

module.exports = { createTable };
