module.exports = (app) => {
    const evaluations = require('../controllers/evaluation.controller.js');


    app.post('/evaluations', evaluations.create);

    
    app.get('/evaluations', evaluations.findAll);

   
    app.get('/evaluations/:evaluationId', evaluations.findOne);

    
    app.put('/evaluations/:evaluationId', evaluations.update);

    
    app.delete('/evaluations/:evaluationId', evaluations.delete);
}
