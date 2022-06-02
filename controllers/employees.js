const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const employeesModel = require('../models/employees');
var helpers = require('./helpers')

//Employees Model
const model = mongoose.model("employees", employeesModel)

//Employees controller
/* READ */
router.get('/', (req, res) => {
   model.find()
   .then(data => res.json(data))
   .catch(err => {
      console.log(err)
      res.sendStatus(500)
   })
});

router.get('/:id', (req,res)=>{
   let { id } = req.params

   model.findById(id)
   .then( data => {
      res.statusCode = 200
      res.send(data)
   })
   .catch(err => {
      res.statusCode = 404
      res.send({error : 'not found'})
   })
})

/* CREATE */
router.post('/', (req, res) => {
   let {name, password, isADM} = req.body;

   if(helpers.validationEmployeesData(name, password, isADM)){
      model.create({
         name, password, isADM
      })
      .then(() => {
         res.sendStatus(200)
         console.log('new employee -> ' + new Date());
      })
      .catch(err => {
         res.sendStatus(500)
         console.log(err)
      })
   }
   else{
      res.statusCode = 400
      res.send({error: 'bad request'})
   }
})

/* UPDATE */
router.put('/:id',(req, res)=>{
   let { id } = req.params;
   let {name, password, isADM} = req.body;

   model.findByIdAndUpdate(id,{
      name,
      password,
      isADM
   })
   .then(() => res.sendStatus(200))
   .catch(err => {
      res.statusCode = 404
      res.send({error : 'not found'})
      console.log(err)
   })
})

/* DELETE */
router.delete('/:id',(req, res)=>{
   let { id } = req.params

   model.findByIdAndDelete(id)
   .then(() => res.sendStatus(200))
   .catch(err => {
      res.statusCode = 404
      res.send({error: 'not found'})
   })
})
module.exports = router