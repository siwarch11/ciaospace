const Reservation = require('../models/reservation.model.js');

// Create and Save a new reservation
exports.create = (req, res) => {
    // Validate request
    if(!req.body.email) {
        return res.status(400).send({
            message: "reservation content can not be empty"
        });
    }

    // Create a reservation
    const reservation = new Reservation({
        name: req.body.name,
        number: req.body. number || "Untitled reservation", 
        email : req.body.email,
        date: req.body.date,
        idUser: req.body.idUser,
        idOffre: req.body.idOffre,
        status: req.body.status,
    
    });

    // Save reservation in the database
    reservation.save()
    .then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while creating the reservation."
        });
    });
};

// Retrieve and return all reservation from the database.
exports.findAll = (req, res) => {
    Reservation.find()
    .then(reservations => { 
        res.send(reservations);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving reservations."
        });
    });
};

// Find a single reservation with a reservationId
exports.findOne = (req, res) => {
    Reservation.findById(req.params.reservationId)
    .then(reservation => {
        if(!reservation) {
            return res.status(404).send({
                message: "reservation not found with id " + req.params.reservationId
            });            
        }
        res.send(reservation);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "reservation not found with id " + req.params.reservationId
            });                
        }
        return res.status(500).send({
            message: "Error retrieving reservation with id " + req.params.reservationId
        });
    });
};

// Update a reservation identified by the reservationId in the request
exports.update = (req, res) => {
    // Validate Request
    if(!req.body.email) {
        return res.status(400).send({
            message: "reservation content can not be empty"
        });
    }

    // Find reservation and update it with the request body
    Reservation.findByIdAndUpdate(req.params.reservationId, {
        name: req.body.name,
        number: req.body. number || "Untitled reservation", 
        email : req.body.email,
        date: req.body.date,
        idUser: req.body.idUser,
        idOffre: req.body.idOffre,
        status: req.body.status,
  
        
    }, {new: true})
    .then(reservation => {
        if(!reservation) {
            return res.status(404).send({
                message: "reservation not found with id " + req.params.reservationId
            });
        }
        res.send(reservation);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "reservation not found with id " + req.params.reservationId
            });                
        }
        return res.status(500).send({
            message: "Error updating reservation with id " + req.params.reservationId
        });
    });
};

// Delete a reservation with the specified reservationId in the request
exports.delete = (req, res) => {
    Reservation.findByIdAndRemove(req.params.reservationId)
    .then(reservation => {
        if(!reservation) {
            return res.status(404).send({
                message: "reservation not found with id " + req.params.reservationId
            });
        }
        res.send({message: "reservation deleted successfully!"});
    }).catch(err => {
        if(err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(404).send({
                message: "reservation not found with id " + req.params.reservationId
            });                
        }
        return res.status(500).send({
            message: "Could not delete reservation with id " + req.params.reservationId
        });
    });
};
