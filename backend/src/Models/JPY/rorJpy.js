const mongoose = require("mongoose");
const rorJpySchema = new mongoose.Schema({
    date: {
        type: Date,
        unique: true,
        
    },
    rateOfReturn: {
        type: Number,
        required: true,
    }
  
    
})

const RoRJPY = mongoose.model("rorJpy", rorJpySchema);

module.exports = RoRJPY