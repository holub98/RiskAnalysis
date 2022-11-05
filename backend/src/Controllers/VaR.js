const express = require("express");
const app = express();
const VaRModel = require("../Models/Var");
const RoRModel = require("../Models/dLRoR");
const statistic = require("simple-statistics");

app.post("/api/VaR", async (req, res, next) => {
  try {
    const startDate = req.query.startDate;
    const endDate = req.query.endDate;
    const currency = req.query.currency;
    const confidenceLevel = req.query.confidenceLevel;
    const cost = req.query.cost;
    const criticalValue95 = 1.65;
    const criticalValue99 = 2.33;
    try {
      const VaRExist = await VaRModel.find({
        startDate: startDate,
        endDate: endDate,
        confidenceLevel: confidenceLevel,
        cost: cost,
        currency: currency,
      });
      if (VaRExist.length !== 0) {
        VaRModel.find({
          startDate: startDate,
          endDate: endDate,
          confidenceLevel: confidenceLevel,
          cost: cost,
          currency: currency,
        })
          .then((result) => {
            res.send(result);
          })
          .catch((err) => {
            console.log(err);
          });
      } else {
        if (confidenceLevel == "0.05") {
          await RoRModel.find({
            date: {
              $gte: startDate,
              $lte: endDate,
            },
            currency: currency,
          })
            .then((result) => {
              let value = result.map((a) => a.rateOfReturn);
              new VaRModel({
                startDate: startDate,
                endDate: endDate,
                confidenceLevel: 0.05,
                cost: cost,
                value:
                  cost * statistic.standardDeviation(value) * criticalValue95,
                currency: currency,
              }).save();
            })
            .catch((err) => {
              console.log(err);
            });
        }
        if (confidenceLevel == "0.01") {
          await RoRModel.find({
            date: {
              $gte: startDate,
              $lte: endDate,
            },
            currency: currency,
          })
            .then((result) => {
              let value = result.map((a) => a.rateOfReturn);
              new VaRModel({
                startDate: startDate,
                endDate: endDate,
                confidenceLevel: 0.01,
                cost: cost,
                value:
                  cost * statistic.standardDeviation(value) * criticalValue99,
                currency: currency,
              }).save();
            })
            .catch((err) => {
              console.log(err);
            });
        }
        VaRModel.find({
          startDate: startDate,
          endDate: endDate,
          confidenceLevel: confidenceLevel,
          cost: cost,
          currency: currency,
        })
          .then((result) => {
            res.send(result);
          })
          .catch((err) => {
            console.log(err);
          });
      }
    } catch (error) {
      error.message;
    }
  } catch (error) {
    res.status(500).send(error);
  }
});

module.exports = app;
