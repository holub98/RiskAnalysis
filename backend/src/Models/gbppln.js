const mongoose = require("mongoose");
const gbpplnSchema = new mongoose.Schema({
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

const GBPPLN = mongoose.model("GBPPLN", gbpplnSchema);

module.exports = GBPPLN ;