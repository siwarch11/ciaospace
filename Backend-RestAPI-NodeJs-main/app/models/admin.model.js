const mongoose = require('mongoose');

const AdminSchema = mongoose.Schema({
    fname: String,
    lname: String,
    status: String,
    email: {
        type: String,
        unique: [true, 'The email is unique']
       
},
   
    password: String,
    image: String,
}, {
    timestamps: true
});

module.exports = mongoose.model('Admin', AdminSchema);