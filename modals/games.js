const mongoose = require("mongoose");

const gamesSchema = mongoose.Schema({
    name: {
        type: String,
        require: true,
        unique: true,
        uppercase: true
    },
    results: [{
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
    // latestResult: [{
    //     data: {
    //         type: String,
    //         required: true,
    //     },
    //     date: {
    //         type: Date,
    //         default: Date.now, // Automatically sets the date to the current date
    //     },
    //     _id: false
    // }]
},
    { timestamps: true }
);


const Games = mongoose.model("games-db", gamesSchema);


module.exports = Games