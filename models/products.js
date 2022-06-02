const mongoose = require('mongoose');

const products_SCHEMA = new mongoose.Schema({
   name: String,
   category: String,
   amount: Number,
   price: Number,
})

module.exports = products_SCHEMA;