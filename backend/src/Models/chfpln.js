const mongoose = require("mongoose");
const chfplnSchema = new mongoose.Schema({
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

const CHFPLN = mongoose.model("CHFPLN", chfplnSchema);

module.exports = CHFPLN ;