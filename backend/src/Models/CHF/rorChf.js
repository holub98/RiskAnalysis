const mongoose = require("mongoose");
const rorChfSchema = new mongoose.Schema({
    date: {
        type: Date,
        unique: true,
        
    },
    rateOfReturn: {
        type: Number,
        required: true,
    }
  
    
})

const RoRCHF = mongoose.model("rorChf", rorChfSchema);

module.exports = RoRCHF