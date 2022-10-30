const express = require("express");
const EurPlnModel = require("../../Models/eurpln")
const app = express();
app.get('/api/euro', async(req,res) =>{

    try{
     await EurPlnModel.find().sort('-date').then((result) =>{
      res.send(result)
      
     }).catch(err =>{
      console.log(err);
     });
      
  
    }catch (error) {
      res.status(500).send(error);
    }
  })

  module.exports = app; 