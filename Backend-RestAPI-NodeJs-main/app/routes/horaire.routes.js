module.exports = (app) => {
    const horaires = require('../controllers/horaire.controller.js');


    app.post('/horaires', horaires.create);

    
    app.get('/horaires', horaires.findAll);

   
    app.get('/horaires/:horaireId', horaires.findOne);

    
    app.put('/horaires/:horaireId', horaires.update);

    
    app.delete('/horaires/:horaireId', horaires.delete);
}
