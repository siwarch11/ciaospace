module.exports = (app) => {
    const offres = require('../controllers/offre.controller.js');


    app.post('/offres', offres.create);

    
    app.get('/offres', offres.findAll);

   
    app.get('/offres/:offreId', offres.findOne);

    
    app.put('/offres/:offreId', offres.update);

    
    app.delete('/offres/:offreId', offres.delete);
}
