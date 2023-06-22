const mongoose = require('mongoose');

const PartnerSchema = mongoose.Schema(
    {
    companyName: String,
    email: {
        type: String,
        unique: [true, 'The email is unique']
       
},
password:String,
  image:String, 
    phoneNumber: String,
    x:String,
    y:String
}, {
    timestamps: true
});

module.exports = mongoose.model('Partner', PartnerSchema);