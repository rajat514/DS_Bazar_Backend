const mongoose = require("mongoose");

const tokenSchema = mongoose.Schema({
    email: {
        type: String,
        require: true
    },
    token: {
        type: String,
        require: true
    }
},
    { timestamps: true }
);


const TokenDB = mongoose.model("token-db", tokenSchema);


module.exports = TokenDB