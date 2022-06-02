const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const productsModel = require('../models/products');
const helpers = require('./helpers')

//Products Model
const model = mongoose.model('products', productsModel)

//Products EndPoints

/* READ */
router.get('/',(req, res)=>{
   model.find()
   .then(data => {
      res.statusCode = 200;
      res.json(data);
   })
   .catch(err => {
      res.statusCode = 500;
      res.send({error : 'internal server error'})
      console.log(err)
   })
})

router.get('/:id',(req, res)=>{
   let {id} = req.params

   model.findById(id)
   .then(data => {
      res.statusCode = 200;
      res.json(data);
   })
   .catch(err => {
      res.statusCode = 500;
      res.send({error : 'internal server error'})
      console.log(err)
   })
})

/* CREATE */
router.post('/',(req, res)=>{
   const {name, category, amount, price} = req.body;
   
   if(helpers.validationProuductData(amount, category, name, price)){
      model.create({
         name,
         category,
         amount: parseInt(amount),
         price: parseFloat(price)
      })          
      .then(() => res.sendStatus(200))
      .catch(err => {
         res.statusCode = 500;
         res.send({error : 'internal server error'})
         console.log(err);
      })
   }
   else{
      res.statusCode = 400;
      res.send({error : 'bad request'})
   }
})

/* UPDATE */
router.put('/:id',(req, res)=>{
   var { id } = req.params;
   let {name, category, amount, price} = req.body;

   model.findByIdAndUpdate(id,{
      name : name,
      category : category,
      amount : amount,
      price : price,
   })
   .then(() => res.sendStatus(200))
   .catch(err => {
      res.statusCode = 404
      res.send({error : 'not found'})
      console.log(err)
   })
})

/* DELETE */
router.delete('/:id', (req, res)=>{
   let { id } = req.params;

   model.findByIdAndDelete(id)
   .then(() => {
      res.sendStatus(200);
   })
   .catch(err => {
      res.statusCode = 404;                                 
      res.send({error : 'not found'})
      console.log(err)
   })
})

//Special Functions
/* Discount*/
router.put('/discount/:id', (req, res)=>{
   let { id } = req.params;
   let { discount } = req.body;

   model.findById(id)
   .then(data => {
     let discountProduct = (discount * data.price) / 100
      
         model.findByIdAndUpdate(id, {$inc : {price: -discountProduct}})
         .then(() => res.sendStatus(200))
         .catch(err => {
            res.statusCode = 500;
            res.send({error : 'internal server error'})
            console.log(err)
         })
   })
   .catch(err =>{
      res.statusCode = 404
      res.send({error: 'not found'})
      console.log(err)
   })
})

module.exports = router