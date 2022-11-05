const mongoose = require("mongoose");
const currencySchema = mongoose.Schema({
    date: {
        type: Date,
        require: true,
        
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
    },
    currency: {
        type: String,
        require: true
    }
})

const currency = mongoose.model("currency", currencySchema);

module.exports = currency;