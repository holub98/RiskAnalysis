const express = require("express");
const GbpPlnModel = require("../../Models/gbppln")
const app = express();

app.get('/api/gbp', async(req,res) =>{
    try{
     await GbpPlnModel.find().sort('date').then((result) =>{
      res.send(result)
      
     }).catch(err =>{
      console.log(err);
     });
      
  
    }catch (error) {
      res.status(500).send(error);
    }
  })

  module.exports = app;