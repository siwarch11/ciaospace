const Reclamation = require('../models/reclamation.model.js');

// Create and Save a new reclamation
exports.create = (req, res) => {
    // Validate request
    if(!req.body.email) {
        return res.status(400).send({
            message: "reclamation content can not be empty"
        });
    }

    // Create a reclamation
    const reclamation = new Reclamation({
        name: req.body.name || "Untitled Reclamation", 

        email : req.body.email,
        message: req.body.message 
       
    });

    // Save reclamation in the database
    reclamation.save()
    .then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while creating the reclamation."
        });
    });
};


// Retrieve and return all reclamation from the database.
exports.findAll = (req, res) => {
    Reclamation.find()
    .then(reclamations => {
        res.send(reclamations);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving reclamations."
        });
    });
};

// Find a single reclamation with a reclamationId
exports.findOne = (req, res) => {
    Reclamation.findById(req.params.reclamationId)
    .then(reclamation => {
        if(!reclamation) {
            return res.status(404).send({
                message: "reclamation not found with id " + req.params.reclamationId
            });            
        }
        res.send(reclamation);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "reclamation not found with id " + req.params.reclamationId
            });                
        }
        return res.status(500).send({
            message: "Error retrieving reclamation with id " + req.params.reclamationId
        });
    });
};

// Update a reclamation identified by the reclamationId in the request
exports.update = (req, res) => {
    // Validate Request
    if(!req.body.email) {
        return res.status(400).send({
            message: "reclamation content can not be empty"
        });
    }

    // Find reclamation and update it with the request body
    Reclamation.findByIdAndUpdate(req.params.reclamationId, {
        name: req.body.name || "Untitled Reclamation", 

        email : req.body.email,
        message: req.body.message
    }, {new: true})
    .then(reclamation => {
        if(!reclamation) {
            return res.status(404).send({
                message: "reclamation not found with id " + req.params.reclamationId
            });
        }
        res.send(reclamation);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "reclamation not found with id " + req.params.reclamationId
            });                
        }
        return res.status(500).send({
            message: "Error updating reclamation with id " + req.params.reclamationId
        });
    });
};

// Delete a reclamation with the specified reclamationId in the request
exports.delete = (req, res) => {
    Reclamation.findByIdAndRemove(req.params.reclamationId)
    .then(reclamation => {
        if(!reclamation) {
            return res.status(404).send({
                message: "reclamation not found with id " + req.params.reclamationId
            });
        }
        res.send({message: "reclamation deleted successfully!"});
    }).catch(err => {
        if(err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(404).send({
                message: "reclamation not found with id " + req.params.reclamationId
            });                
        }
        return res.status(500).send({
            message: "Could not delete reclamation with id " + req.params.reclamationId
        });
    });
};
