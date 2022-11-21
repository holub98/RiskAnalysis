const mongoose = require("mongoose");
const dLRoRSchema = mongoose.Schema({
  date: {
    type: Date,
    require: true,
  },
  rateOfReturn: {
    type: Number,
    required: true,
  },
  currency: {
    type: String,
    require: true,
  },
});

const dLRoR = mongoose.model("dailyLnRateOfReturn", dLRoRSchema);

module.exports = dLRoR;
