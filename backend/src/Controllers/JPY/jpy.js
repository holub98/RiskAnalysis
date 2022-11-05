const express = require("express");
const currencyModel = require("../../Models/currency");
const app = express();

app.get("/api/jpy", async (req, res) => {
  try {
    await currencyModel
      .find({ currency: "JPY" })
      .sort("date")
      .then((result) => {
        res.send(result);
      })
      .catch((err) => {
        console.log(err);
      });
  } catch (error) {
    res.status(500).send(error);
  }
});

module.exports = app;
