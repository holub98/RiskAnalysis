const express = require("express");
const JpyPlnModel = require("../../Models/JPY/jpypln")
const app = express();

app.get('/api/jpy', async(req,res) =>{
    try{
     await JpyPlnModel.find().sort('date').then((result) =>{
      res.send(result)
      
     }).catch(err =>{
      console.log(err);
     });
      
  
    }catch (error) {
      res.status(500).send(error);
    }
  })

  module.exports = app;