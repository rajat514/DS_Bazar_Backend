const mongoose = require("mongoose");

const resultSchema = mongoose.Schema({
    name: {
        type: String,
        require: true,
        unique: true,
        uppercase: true
    },
    latestResult: [{
        data: {
            type: String,
            required: true,
        },
        date: {
            type: Date,
            default: Date.now, // Automatically sets the date to the current date
        },
        _id: false
    }]
},
    { timestamps: true }
);


const LatestResult = mongoose.model("latest-result-db", resultSchema);


module.exports = LatestResult