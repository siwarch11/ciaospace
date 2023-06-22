const mongoose = require('mongoose');

const EvaluationSchema = mongoose.Schema(
    {
        commentaire: String,
        etoile:String,
        idUser: String,
        idOffre: String,
        name: String,
        title: String
            
           
   
   
}, {
    timestamps: true
});

module.exports = mongoose.model('Evaluation', EvaluationSchema);