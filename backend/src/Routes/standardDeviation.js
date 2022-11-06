const express = require("express");
const router = express.Router();
const SDControllers = require("../Controllers/standardDeviation");

router.route("/").get(SDControllers.getSD).post(SDControllers.createSD);

module.exports = router;
