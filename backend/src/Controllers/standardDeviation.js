const express = require("express");
const app = express();
const SDModel = require("../Models/standardDeviation");
const RoRModel = require("../Models/dLRoR");
const statistic = require("simple-statistics");

app.post("/api/standard-deviation", async (req, res, next) => {
  try {
    const startDate = req.query.startDate;
    const endDate = req.query.endDate;
    const currency = req.query.currency;
    try {
      const SDExist = await SDModel.find({
        startDate: startDate,
        endDate: endDate,
        currency: currency,
      });

      if (SDExist.length !== 0) {
        SDModel.find({
          startDate: startDate,
          endDate: endDate,
          currency: currency,
        })
          .then((result) => {
            res.send(result);
          })
          .catch((err) => {
            console.log(err);
          });
      } else {
        await RoRModel.find({
          date: {
            $gte: startDate,
            $lte: endDate,
          },
          currency: currency,
        })
          .then((result) => {
            let value = result.map((a) => a.rateOfReturn);
            new SDModel({
              startDate: startDate,
              endDate: endDate,
              value: statistic.standardDeviation(value),
              currency: currency,
            }).save();
          })
          .catch((err) => {
            console.log(err);
          });
        SDModel.find({
          startDate: startDate,
          endDate: endDate,
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
