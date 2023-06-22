const mongoose = require('mongoose');

const HoraireSchema = mongoose.Schema(
    {
        openingtime: String,
        closingtime:String,
    
   
}, {
    timestamps: true
});

module.exports = mongoose.model('Horaire', HoraireSchema);