const mongoose = require('mongoose');

const ReclamationSchema = mongoose.Schema(
    {
        name:String,
        email:String,
        message:String,
    
   
}, {
    timestamps: true
});

module.exports = mongoose.model('Reclamation', ReclamationSchema);