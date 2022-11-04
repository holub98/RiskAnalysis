const mongoose = require("mongoose");
const eurplnSchema = new mongoose.Schema({
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

const EURPLN = mongoose.model("EURPLN", eurplnSchema);

module.exports = EURPLN ;