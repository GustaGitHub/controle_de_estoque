const express = require('express');
const app = express();
const mongoose = require('mongoose');
const cors = require('cors');

//Cors
app.use(cors())

//Body-Parser
app.use(express.urlencoded({extended: true}));
app.use(express.json());

//Database Connection
mongoose.connect('mongodb://localhost:27017/controle_estoque')
   .then(()=> console.log('successfully connected to the database'))
      .catch(err => console.log(err));

//Controllers
const productsController = require('./controllers/products')
const employeesController = require('./controllers/employees')

app.use('/products',productsController);
app.use('/employees',employeesController);

app.listen(10200);