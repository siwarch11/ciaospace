module.exports = (app) => {
    const partners = require('../controllers/partner.controller.js');


    app.post('/partners', partners.create);

    
    app.get('/partners', partners.findAll);

   
    app.get('/partners/:partnerId', partners.findOne);

    
    app.put('/partners/:partnerId', partners.update);

    
    app.delete('/partners/:partnerId', partners.delete);
}
