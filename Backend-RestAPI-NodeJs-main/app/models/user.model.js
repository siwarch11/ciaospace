const mongoose = require('mongoose');

const UserSchema = mongoose.Schema(
    {
    fname: String,
    lname: String,
    email: {
        type: String,
        unique: [true, 'The email is unique']
       
},
   
    password: String,
    image: String,
}, {
    timestamps: true
});

module.exports = mongoose.model('User', UserSchema);