const mongoose = require("mongoose");
const usdplnSchema = new mongoose.Schema({
    date: {
        type: Date,
        unique: true,
        
    },
    open: {
        type: Number,
        required: true,
    },
    high: {
        type: Number,
        required: true,
    },
    low: {
        type: Number,
        required: true,
    },
    close: {
        type: Number,
        required: true,
    }
    
})

const USDPLN = mongoose.model("USDPLN", usdplnSchema);

module.exports = USDPLN ;