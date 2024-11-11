const mongoose = require('mongoose');

const adminSchema = mongoose.Schema({
    email: {
        type: String,
        require: true,
        unique: true
    },
    password: {
        type: String,
        require: true
    },
},
    { timestamps: true }
);


const Admin = mongoose.model('admin-db', adminSchema);


module.exports = Admin