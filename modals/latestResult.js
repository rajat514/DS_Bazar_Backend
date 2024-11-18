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
    }],
    expireAt: {
        type: Date, // Set to expire at 12 AM
        required: true
    }
},
    { timestamps: true }
);

resultSchema.index({ 'expireAt': 1 }, { expireAfterSeconds: 0 });


const LatestResult = mongoose.model("latest-result-db", resultSchema);


module.exports = LatestResult