const mongoose = require('mongoose');

const employees_SCHEMA = new mongoose.Schema({
   name: String,
   password: String,
   isADM: Boolean
});

module.exports = employees_SCHEMA;