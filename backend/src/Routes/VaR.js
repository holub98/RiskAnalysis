const express = require("express");
const router = express.Router();
const VaRControllers = require("../Controllers/VaR");

router.route("/").get(VaRControllers.getVaR).post(VaRControllers.createVaR);

module.exports = router;
