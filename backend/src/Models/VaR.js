const mongoose = require("mongoose");
const VaRSchema = new mongoose.Schema({
  startDate: {
    type: Date,
    required: true,
  },
  endDate: {
    type: Date,
    required: true,
  },
  confidenceLevel: {
    type: Number,
    required: true,
  },
  cost: {
    type: Number,
    required: true,
  },
  value: {
    type: Number,
    required: true,
  },
  currency: {
    type: String,
    required: true,
  },
});

const VaR = mongoose.model("VaR", VaRSchema);

module.exports = VaR;
