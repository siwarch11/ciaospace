const Horaire = require('../models/horaire.model.js');

// Create and Save a new horaire
exports.create = (req, res) => {
    // Validate request
    if(!req.body.openingtime) {
        return res.status(400).send({
            message: "horaire content can not be empty"
        });
    }

    // Create a horaire
    const horaire = new Horaire({
        openingtime: req.body.openingtime || "Untitled Horaire",
        closingtime: req.body.closingtime , 
    });

    // Save horaire in the database
    horaire.save()
    .then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while creating the horaire."
        });
    });
};

// Retrieve and return all horaire from the database.
exports.findAll = (req, res) => {
    Horaire.find()
    .then(horaires => { 
        res.send(horaires);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving horaires."
        });
    });
};

// Find a single horaire with a horaireId
exports.findOne = (req, res) => {
    Horaire.findById(req.params.horaireId)
    .then(horaire => {
        if(!horaire) {
            return res.status(404).send({
                message: "horaire not found with id " + req.params.horaireId
            });            
        }
        res.send(horaire);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "horaire not found with id " + req.params.horaireId
            });                
        }
        return res.status(500).send({
            message: "Error retrieving horaire with id " + req.params.horaireId
        });
    });
};

// Update a horaire identified by the horaireId in the request
exports.update = (req, res) => {
    // Validate Request
    if(!req.body.openingtime) {
        return res.status(400).send({
            message: "horaire content can not be empty"
        });
    }

    // Find horaire and update it with the request body
    Horaire.findByIdAndUpdate(req.params.horaireId, {
        openingtime: req.body.openingtime || "Untitled Horaire",
        closingtime: req.body.closingtime ,
    }, {new: true})
    .then(horaire => {
        if(!horaire) {
            return res.status(404).send({
                message: "horaire not found with id " + req.params.horaireId
            });
        }
        res.send(horaire);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "horaire not found with id " + req.params.horaireId
            });                
        }
        return res.status(500).send({
            message: "Error updating horaire with id " + req.params.horaireId
        });
    });
};

// Delete a horaire with the specified horaireId in the request
exports.delete = (req, res) => {
    Horaire.findByIdAndRemove(req.params.horaireId)
    .then(horaire => {
        if(!horaire) {
            return res.status(404).send({
                message: "horaire not found with id " + req.params.horaireId
            });
        }
        res.send({message: "horaire deleted successfully!"});
    }).catch(err => {
        if(err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(404).send({
                message: "horaire not found with id " + req.params.horaireId
            });                
        }
        return res.status(500).send({
            message: "Could not delete horaire with id " + req.params.horaireId
        });
    });
};
