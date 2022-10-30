const mongoose = require("mongoose");
const rorEurSchema = new mongoose.Schema({
    date: {
        type: Date,
        unique: true,
        
    },
    rateOfReturn: {
        type: Number,
        required: true,
    }
  
    
})

const RoREUR = mongoose.model("rorEur", rorEurSchema);

module.exports = RoREUR