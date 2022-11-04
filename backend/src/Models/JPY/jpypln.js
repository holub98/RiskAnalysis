const mongoose = require("mongoose");
const jpyplnSchema = new mongoose.Schema({
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

const JPYPLN = mongoose.model("JPYPLN", jpyplnSchema);

module.exports = JPYPLN;