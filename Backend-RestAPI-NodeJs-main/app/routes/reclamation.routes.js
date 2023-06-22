module.exports = (app) => {
    const reclamations = require('../controllers/reclamation.controller.js');


    app.post('/reclamations', reclamations.create);

    
    app.get('/reclamations', reclamations.findAll);

   
    app.get('/reclamations/:reclamationId', reclamations.findOne);

    
    app.put('/reclamations/:reclamationId', reclamations.update);

    
    app.delete('/reclamations/:reclamationId', reclamations.delete);
}
