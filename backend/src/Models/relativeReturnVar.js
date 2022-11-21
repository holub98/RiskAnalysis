const mongoose = require("mongoose");
const rrVaRSchema = new mongoose.Schema({
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
  value: {
    type: Number,
    required: true,
  },
  currency: {
    type: String,
    required: true,
  },
});

const rrVaR = mongoose.model("relativeReturnVaR", rrVaRSchema);

module.exports = rrVaR;
