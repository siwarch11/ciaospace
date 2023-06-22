const mongoose = require('mongoose');

const OffreSchema = mongoose.Schema(
    {
        title:String,
        description:String ,
        date:String, 
        discount:String,
        image:String,
        price :String,
        category:String,
        localisation:String,
        number:String,
        page:String,
        position: String,
        facility: String,
        cancellation: String,
        period: String,
        companion:String,
       specialoffer:String,
        kitchen:String,
        activities:String,
        openingtime:String,
        closingtime:String,

        region:String,
        email:String,
idPart:String,
        status:String,

   

}, {
    timestamps: true
});

module.exports = mongoose.model('Offre', OffreSchema);