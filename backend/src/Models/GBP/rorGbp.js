const mongoose = require("mongoose");
const rorGbpSchema = new mongoose.Schema({
    date: {
        type: Date,
        unique: true,
        
    },
    rateOfReturn: {
        type: Number,
        required: true,
    }
  
    
})

const RoRGBP = mongoose.model("rorGbp", rorGbpSchema);

module.exports = RoRGBP