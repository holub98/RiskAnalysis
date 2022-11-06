const express = require("express");
const router = express.Router();
const currencyControllers = require("../Controllers/currency");

router
  .route("/")
  .get(currencyControllers.getCurrency)
  .post(currencyControllers.createCurrency);

module.exports = router;
