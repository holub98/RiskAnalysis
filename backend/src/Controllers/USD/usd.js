const express = require("express");
const UsdPlnModel = require("../../Models/usdpln")
const app = express();

app.get('/api/usd', async(req,res) =>{
    try{
     await UsdPlnModel.find().sort('-date').then((result) =>{
      res.send(result)
      
     }).catch(err =>{
      console.log(err);
     });
      
  
    }catch (error) {
      res.status(500).send(error);
    }
  })

  module.exports = app;