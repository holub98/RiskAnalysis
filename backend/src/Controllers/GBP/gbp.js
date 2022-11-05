const express = require("express");
const currencyModel = require("../../Models/currency");
const app = express();

app.get("/api/gbp", async (req, res) => {
  try {
    await currencyModel
      .find({ currency: "GBP" })
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
