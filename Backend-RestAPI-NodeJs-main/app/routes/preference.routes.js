module.exports = (app) => {
    const preferences = require('../controllers/preference.controller.js');


    app.post('/preferences', preferences.create);

    
    app.get('/preferences', preferences.findAll);

   
    app.get('/preferences/:preferenceId', preferences.findOne);

    
    app.put('/preferences/:preferenceId', preferences.update);

    
    app.delete('/preferences/:preferenceId', preferences.delete);
}
