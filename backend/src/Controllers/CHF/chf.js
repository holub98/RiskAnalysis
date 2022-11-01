const express = require("express");
const ChfPlnModel = require("../../Models/chfpln")
const app = express();

app.get('/api/chf', async(req,res) =>{
    try{
     await ChfPlnModel.find().sort('date').then((result) =>{
      res.send(result)
      
     }).catch(err =>{
      console.log(err);
     });
      
  
    }catch (error) {
      res.status(500).send(error);
    }
  })

  module.exports = app;