const express = require("express");
const currencyModel = require("../../Models/currency");
const app = express();

app.get("/api/usd", async (req, res) => {
  try {
    await currencyModel
      .find({ currency: "USD" })
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
