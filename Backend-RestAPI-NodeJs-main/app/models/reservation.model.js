const mongoose = require('mongoose');

const ReservationSchema = mongoose.Schema(
    { 
         name:String,
        number: String, 
        email :String,
        date:String,
      idUser: String,
      idOffre: String,
      status: String  
        
       
}, {
    timestamps: true
});

module.exports = mongoose.model('Reservation', ReservationSchema);