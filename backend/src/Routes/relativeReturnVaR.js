const express = require("express");
const router = express.Router();
const relativeReturnVaRControllers = require("../Controllers/relativeReturnVaR");

router
  .route("/")
  .get(relativeReturnVaRControllers.getRRVaR)
  .post(relativeReturnVaRControllers.createRRVaR);

module.exports = router;
