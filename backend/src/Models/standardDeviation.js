const mongoose = require("mongoose");
const sdSchema = new mongoose.Schema({
    startDate: {
        type: Date,
        required: true,
    },
    endDate: {
        type: Date,
        required: true,
    },
    value: {
        type: Number,
        required: true,
    },
    currency: {
        type: String,
        required: true,
    }
})

const SD = mongoose.model("Sd", sdSchema);

module.exports = SD;