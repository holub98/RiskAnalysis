const mongoose = require("mongoose");
const rorUsdSchema = new mongoose.Schema({
    date: {
        type: Date,
        unique: true,
        
    },
    rateOfReturn: {
        type: Number,
        required: true,
    }
  
    
})

const RoRUSD = mongoose.model("rorUsd", rorUsdSchema);

module.exports = RoRUSD