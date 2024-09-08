const { Sequelize, DataTypes } = require('sequelize');
const fs = require('fs');
const path = require('path');

const tableSchema = require('./table.json');

const {sequelize} = require('../db.js')

const getSequelizeType = (field) => {
  switch (field.type) {
    case 'INTEGER': return DataTypes.INTEGER;
    case 'STRING': return DataTypes.STRING;
    case 'TEXT': return DataTypes.TEXT;
    case 'DATE': return DataTypes.DATE;
    case 'BOOLEAN': return DataTypes.BOOLEAN;
    default: return DataTypes.STRING;
  }
};

const createTable = async () => {

Object.keys(tableSchema).forEach(tableName => {
  const tableDef = tableSchema[tableName];
  const attributes = {};

  Object.keys(tableDef.fields).forEach(fieldName => {
    const field = tableDef.fields[fieldName];
    attributes[fieldName] = {
      type: getSequelizeType(field),
      allowNull: field.allowNull || false,
      primaryKey: field.primaryKey || false,
      autoIncrement: field.autoIncrement || false,
      defaultValue: field.defaultValue === 'NOW' ? Sequelize.NOW : field.defaultValue || undefined
    };
  });

  
   sequelize.define(tableName, attributes);
});
await sequelize.sync({ force: false });
console.log('All tables were synchronized successfully.');
};




module.exports = {createTable};
