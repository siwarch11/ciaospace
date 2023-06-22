const Preferences = require('../models/preference.model.js');

// Create and Save a new preferences
exports.create = (req, res) => {
    // Validate request
    if(!req.body.region) {
        return res.status(400).send({
            message: "preferences content can not be empty"
        });
    }

    // Create a preferences
    const preferences = new Preferences({
        region: req.body.region || "Untitled Preferences", 
        date: req.body.date,
        periode : req.body.periode,
        budget: req.body.budget,
        compagnie: req.body.compagnie,
        type_de_restaurant: req.body.type_de_restaurant,
        type_de_residence: req.body.type_de_residence,
        temps_preferes: req.body.temps_preferes,
        activitees: req.body.activitees,
    });

    // Save preferences in the database
    preferences.save()
    .then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while creating the preferences."
        });
    });
};

// Retrieve and return all preferences from the database.
exports.findAll = (req, res) => {
    Preferences.find()
    .then(preferencess => {
        res.send(preferencess);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving preferencess."
        });
    });
};

// Find a single preferences with a preferencesId
exports.findOne = (req, res) => {
    Preferences.findById(req.params.preferencesId)
    .then(preferences => {
        if(!preferences) {
            return res.status(404).send({
                message: "preferences not found with id " + req.params.preferencesId
            });            
        }
        res.send(preferences);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "preferences not found with id " + req.params.preferencesId
            });                
        }
        return res.status(500).send({
            message: "Error retrieving preferences with id " + req.params.preferencesId
        });
    });
};

// Update a preferences identified by the preferencesId in the request
exports.update = (req, res) => {
    // Validate Request
    if(!req.body.region) {
        return res.status(400).send({
            message: "preferences content can not be empty"
        });
    }

    // Find preferences and update it with the request body
    Preferences.findByIdAndUpdate(req.params.preferencesId, {
        region: req.body.region || "Untitled Preferences", 
        date: req.body.date,
        periode : req.body.periode,
        budget: req.body.budget,
        compagnie: req.body.compagnie,
        type_de_restaurant: req.body.type_de_restaurant,
        type_de_residence: req.body.type_de_residence,
        temps_preferes: req.body.temps_preferes,
        activitees: req.body.activitees,
    }, {new: true})
    .then(preferences => {
        if(!preferences) {
            return res.status(404).send({
                message: "preferences not found with id " + req.params.preferencesId
            });
        }
        res.send(preferences);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "preferences not found with id " + req.params.preferencesId
            });                
        }
        return res.status(500).send({
            message: "Error updating preferences with id " + req.params.preferencesId
        });
    });
};

// Delete a preferences with the specified preferencesId in the request
exports.delete = (req, res) => {
    Preferences.findByIdAndRemove(req.params.preferencesId)
    .then(preferences => {
        if(!preferences) {
            return res.status(404).send({
                message: "preferences not found with id " + req.params.preferencesId
            });
        }
        res.send({message: "preferences deleted successfully!"});
    }).catch(err => {
        if(err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(404).send({
                message: "preferences not found with id " + req.params.preferencesId
            });                
        }
        return res.status(500).send({
            message: "Could not delete preferences with id " + req.params.preferencesId
        });
    });
};
