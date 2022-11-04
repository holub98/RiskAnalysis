const express = require("express");
const app = express();
const SDModel = require('../Models/standardDeviation');
const RoRUSDModel = require('../Models/USD/rorUsd');
const RoRGBPModel = require('../Models/GBP/rorGbp');
const RoREURModel = require('../Models/EUR/rorEuro');
const RoRCHFModel = require('../Models/CHF/rorChf');
const RoRJPYModel = require('../Models/JPY/rorJpy');
const statistic = require('simple-statistics');

app.post('/api/standard-deviation', async(req, res, next)=>{
    const startDate = req.query.startDate;
    const endDate = req.query.endDate;
    const currency = req.query.currency;
    try{
     const SDExist = await SDModel.find({startDate: startDate, endDate: endDate})
     
      if(SDExist.length !== 0){
        SDModel.find({startDate: startDate, endDate: endDate}).then((result) =>{
          res.send(result)
      }).catch(err =>{
          console.log(err);
         });
      } else{
      
        await RoREURModel.find({date: {
        $gte:startDate , $lte:endDate
    } }).then((result) =>{
      let euroValue = result.map(a => a.rateOfReturn);
      new SDModel({
        startDate: startDate,
        endDate: endDate,
        value: statistic.standardDeviation(euroValue),
        currency: "EUR"
      }).save(); 
    }).catch(err =>{
        console.log(err);
       });

       await RoRGBPModel.find({date: {
        $gte:startDate , $lte:endDate
    } }).then((result) =>{
      let gbpValue = result.map(a => a.rateOfReturn);
      new SDModel({
        startDate: startDate,
        endDate: endDate,
        value: statistic.standardDeviation(gbpValue),
        currency: "GBP"
      }).save(); 
    }).catch(err =>{
        console.log(err);
       });

       await RoRUSDModel.find({date: {
        $gte:startDate , $lte:endDate
    } }).then((result) =>{
      let usdValue = result.map(a => a.rateOfReturn);
      new SDModel({
        startDate: startDate,
        endDate: endDate,
        value: statistic.standardDeviation(usdValue),
        currency: "USD"
      }).save(); 
    }).catch(err =>{
        console.log(err);
       });
       await RoRCHFModel.find({date: {
        $gte:startDate , $lte:endDate
    } }).then((result) =>{
      let chfValue = result.map(a => a.rateOfReturn);
      new SDModel({
        startDate: startDate,
        endDate: endDate,
        value: statistic.standardDeviation(chfValue),
        currency: "CHF"
      }).save(); 
    }).catch(err =>{
        console.log(err);
       });
       await RoRJPYModel.find({date: {
        $gte:startDate , $lte:endDate
    } }).then((result) =>{
      let jpyValue = result.map(a => a.rateOfReturn);
      new SDModel({
        startDate: startDate,
        endDate: endDate,
        value: statistic.standardDeviation(jpyValue),
        currency: "USD"
      }).save(); 
    }).catch(err =>{
        console.log(err);
       });
       SDModel.findOne({startDate: startDate, endDate: endDate, currency: currency}).then((result) =>{
        res.send(result)
    }).catch(err =>{
        console.log(err);
       });
    }
  }catch(error){
    error.message;
  }
  
})

module.exports = app;