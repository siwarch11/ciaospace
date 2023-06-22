const Partner = require('../models/partner.model.js');

// Create and Save a new partner
exports.create = (req, res) => {
    // Validate request
    if(!req.body.email) {
        return res.status(400).send({
            message: "partner content can not be empty"
        });
    }

    // Create a partner
    const partner = new Partner({
        companyName: req.body.companyName , 
        email : req.body.email,
        password : req.body.password,
        image : req.body.image, 
        phoneNumber: req.body.phoneNumber,
        x: req.body.x,
        y: req.body.y
    });

    // Save partner in the database
    partner.save()
    .then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while creating the partner."
        });
    });
};

// Retrieve and return all partner from the database.
exports.findAll = (req, res) => {
    Partner.find()
    .then(partners => {
        res.send(partners);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving partners."
        });
    });
};

// Find a single partner with a partnerId
exports.findOne = (req, res) => {
    Partner.findById(req.params.partnerId)
    .then(partner => {
        if(!partner) {
            return res.status(404).send({
                message: "partner not found with id " + req.params.partnerId
            });            
        }
        res.send(partner);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "partner not found with id " + req.params.partnerId
            });                
        }
        return res.status(500).send({
            message: "Error retrieving partner with id " + req.params.partnerId
        });
    });
};

// Update a partner identified by the partnerId in the request
exports.update = (req, res) => {
    // Validate Request
    if(!req.body.email) {
        return res.status(400).send({
            message: "partner content can not be empty"
        });
    }

    // Find partner and update it with the request body
    Partner.findByIdAndUpdate(req.params.partnerId, {
        companyName: req.body.companyName , 
        email : req.body.email,
        password : req.body.password,
        image : req.body.image, 
        phonenumber: req.body.phoneNumber,
        x: req.body.x,
        y: req.body.y
        
    }, {new: true})
    .then(partner => {
        if(!partner) {
            return res.status(404).send({
                message: "partner not found with id " + req.params.partnerId
            });
        }
        res.send(partner);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "partner not found with id " + req.params.partnerId
            });                
        }
        return res.status(500).send({
            message: "Error updating partner with id " + req.params.partnerId
        });
    });
};

// Delete a partner with the specified partnerId in the request
exports.delete = (req, res) => {
    Partner.findByIdAndRemove(req.params.partnerId)
    .then(partner => {
        if(!partner) {
            return res.status(404).send({
                message: "partner not found with id " + req.params.partnerId
            });
        }
        res.send({message: "partner deleted successfully!"});
    }).catch(err => {
        if(err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(404).send({
                message: "partner not found with id " + req.params.partnerId
            });                
        }
        return res.status(500).send({
            message: "Could not delete partner with id " + req.params.partnerId
        });
    });
};
