const express = require("express");
const app = express();
const rrVaRModel = require('../Models/relativeReturnVar');
const RoRUSDModel = require('../Models/USD/rorUsd');
const RoRGBPModel = require('../Models/GBP/rorGbp');
const RoREURModel = require('../Models/EUR/rorEuro');
const RoRCHFModel = require('../Models/CHF/rorChf');
const RoRJPYModel = require('../Models/JPY/rorJpy');
const statistic = require('simple-statistics');

app.post('/api/relative-returnVaR', async(req, res, next)=>{
    const startDate = req.query.startDate;
    const endDate = req.query.endDate;
    const currency = req.query.currency;
    const confidenceLevel = req.query.confidenceLevel;
    const criticalValue95 = 1.65;
    const criticalValue99 = 2.33;
    try{
        const rrVaRExist = await rrVaRModel.find({startDate: startDate, endDate: endDate, confidenceLevel: confidenceLevel })
        if(rrVaRExist.length !== 0){
            rrVaRModel.find({startDate: startDate, endDate: endDate, confidenceLevel: confidenceLevel }).then((result) =>{
                res.send(result)
            }).catch(err =>{
                console.log(err);
               });
        }else{
            if(confidenceLevel == '0.05'){
                await RoREURModel.find({date: {
                    $gte:startDate , $lte:endDate
                } }).then((result) =>{
                  let euroValue = result.map(a => a.rateOfReturn);
                new rrVaRModel({
                    startDate: startDate,
                    endDate: endDate,
                    confidenceLevel: 0.05,
                    value: statistic.standardDeviation(euroValue)*criticalValue95,
                    currency: "EUR"
                  }).save();
                }).catch(err =>{
                    console.log(err);
                   });

                   await RoRGBPModel.find({date: {
                    $gte:startDate , $lte:endDate
                } }).then((result) =>{
                  let gbpValue = result.map(a => a.rateOfReturn);
                  new rrVaRModel({
                    startDate: startDate,
                    endDate: endDate,
                    confidenceLevel: 0.05,
                    value: statistic.standardDeviation(gbpValue)*criticalValue95,
                    currency: "GBP"
                  }).save();
                }).catch(err =>{
                    console.log(err);
                   });

                   await RoRUSDModel.find({date: {
                    $gte:startDate , $lte:endDate
                } }).then((result) =>{
                  let usdValue = result.map(a => a.rateOfReturn);
                  new rrVaRModel({
                    startDate: startDate,
                    endDate: endDate,
                    confidenceLevel: 0.05,
                    value: statistic.standardDeviation(usdValue)*criticalValue95,
                    currency: "USD"
                  }).save();    
                }).catch(err =>{
                 console.log(err);
                });

                await RoRCHFModel.find({date: {
                    $gte:startDate , $lte:endDate
                } }).then((result) =>{
                  let chfValue = result.map(a => a.rateOfReturn);
                  new rrVaRModel({
                    startDate: startDate,
                    endDate: endDate,
                    confidenceLevel: 0.05,
                    value: statistic.standardDeviation(chfValue)*criticalValue95,
                    currency: "CHF"
                  }).save();
                }).catch(err =>{
                    console.log(err);
                   });

                   await RoRJPYModel.find({date: {
                    $gte:startDate , $lte:endDate
                } }).then((result) =>{
                  let jpyValue = result.map(a => a.rateOfReturn);
                  new rrVaRModel({
                    startDate: startDate,
                    endDate: endDate,
                    confidenceLevel: 0.05,
                    value: statistic.standardDeviation(jpyValue)*criticalValue95,
                    currency: "JPY"
                  }).save();
                }).catch(err =>{
                    console.log(err);
                   });

                   rrVaRModel.find({startDate: startDate, endDate: endDate, confidenceLevel: confidenceLevel }).then((result) =>{
                    res.send(result)
                }).catch(err =>{
                    console.log(err);
                   });
            }
            if(confidenceLevel == '0.01'){
                await RoREURModel.find({date: {
                    $gte:startDate , $lte:endDate
                } }).then((result) =>{
                  let euroValue = result.map(a => a.rateOfReturn);
                new rrVaRModel({
                    startDate: startDate,
                    endDate: endDate,
                    confidenceLevel: confidenceLevel,
                    value: statistic.standardDeviation(euroValue)*criticalValue99,
                    currency: "EUR"
                  }).save();
                }).catch(err =>{
                    console.log(err);
                   });

                   await RoRGBPModel.find({date: {
                    $gte:startDate , $lte:endDate
                } }).then((result) =>{
                  let gbpValue = result.map(a => a.rateOfReturn);
                  new rrVaRModel({
                    startDate: startDate,
                    endDate: endDate,
                    confidenceLevel: confidenceLevel,
                    value: statistic.standardDeviation(gbpValue)*criticalValue99,
                    currency: "GBP"
                  }).save();
                }).catch(err =>{
                    console.log(err);
                   });

                   await RoRUSDModel.find({date: {
                    $gte:startDate , $lte:endDate
                } }).then((result) =>{
                  let usdValue = result.map(a => a.rateOfReturn);
                  new rrVaRModel({
                    startDate: startDate,
                    endDate: endDate,
                    confidenceLevel: confidenceLevel,
                    value: statistic.standardDeviation(usdValue)*criticalValue99,
                    currency: "USD"
                  }).save();    
                }).catch(err =>{
                 console.log(err);
                });

                await RoRCHFModel.find({date: {
                    $gte:startDate , $lte:endDate
                } }).then((result) =>{
                  let chfValue = result.map(a => a.rateOfReturn);
                  new rrVaRModel({
                    startDate: startDate,
                    endDate: endDate,
                    confidenceLevel: confidenceLevel,
                    value: statistic.standardDeviation(chfValue)*criticalValue99,
                    currency: "CHF"
                  }).save();
                }).catch(err =>{
                    console.log(err);
                   });

                   await RoRJPYModel.find({date: {
                    $gte:startDate , $lte:endDate
                } }).then((result) =>{
                  let jpyValue = result.map(a => a.rateOfReturn);
                  new rrVaRModel({
                    startDate: startDate,
                    endDate: endDate,
                    confidenceLevel: confidenceLevel,
                    value: statistic.standardDeviation(jpyValue)*criticalValue99,
                    currency: "JPY"
                  }).save();
                }).catch(err =>{
                    console.log(err);
                   });

                   rrVaRModel.find({startDate: startDate, endDate: endDate, confidenceLevel: confidenceLevel }).then((result) =>{
                    res.send(result)
                }).catch(err =>{
                    console.log(err);
                   });
            }
        }
    }catch(error){
      error.message;
  }

})

module.exports = app;