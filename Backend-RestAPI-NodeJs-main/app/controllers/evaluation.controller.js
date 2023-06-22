const Evaluation = require('../models/evaluation.model.js');

// Create and Save a new evaluation
exports.create = (req, res) => {
    // Validate request
    if(!req.body.commentaire) {
        return res.status(400).send({
            message: "evaluation content can not be empty"
        });
    }

    // Create a evaluation
    const evaluation = new Evaluation({
        commentaire: req.body.commentaire,
        etoile: req.body.etoile || "Untitled evaluation", 
        idUser: req.body.idUser,
        idOffre: req.body.idOffre,
        name: req.body.name,
        title: req.body.title,
    });

    // Save evaluation in the database
    evaluation.save()
    .then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while creating the evaluation."
        });
    });
};

// Retrieve and return all evaluation from the database.
exports.findAll = (req, res) => {
    Evaluation.find()
    .then(evaluations => { 
        res.send(evaluations);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving evaluations."
        });
    });
};

// Find a single evaluation with a evaluationId
exports.findOne = (req, res) => {
    Evaluation.findById(req.params.evaluationId)
    .then(evaluation => {
        if(!evaluation) {
            return res.status(404).send({
                message: "evaluation not found with id " + req.params.evaluationId
            });            
        }
        res.send(evaluation);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "evaluation not found with id " + req.params.evaluationId
            });                
        }
        return res.status(500).send({
            message: "Error retrieving evaluation with id " + req.params.evaluationId
        });
    });
};

// Update a evaluation identified by the evaluationId in the request
exports.update = (req, res) => {
    // Validate Request
    if(!req.body.commentaire) {
        return res.status(400).send({
            message: "evaluation content can not be empty"
        });
    }

    // Find evaluation and update it with the request body
    Evaluation.findByIdAndUpdate(req.params.evaluationId, {
        commentaire: req.body.commentaire,
        etoile: req.body.etoile || "Untitled evaluation", 
        idUser: req.body.idUser,
        idOffre: req.body.idOffre,
        name: req.body.name,
        title: req.body.title,
       
    }, {new: true})
    .then(evaluation => {
        if(!evaluation) {
            return res.status(404).send({
                message: "evaluation not found with id " + req.params.evaluationId
            });
        }
        res.send(evaluation);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "evaluation not found with id " + req.params.evaluationId
            });                
        }
        return res.status(500).send({
            message: "Error updating evaluation with id " + req.params.evaluationId
        });
    });
};

// Delete a evaluation with the specified evaluationId in the request
exports.delete = (req, res) => {
    Evaluation.findByIdAndRemove(req.params.evaluationId)
    .then(evaluation => {
        if(!evaluation) {
            return res.status(404).send({
                message: "evaluation not found with id " + req.params.evaluationId
            });
        }
        res.send({message: "evaluation deleted successfully!"});
    }).catch(err => {
        if(err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(404).send({
                message: "evaluation not found with id " + req.params.evaluationId
            });                
        }
        return res.status(500).send({
            message: "Could not delete evaluation with id " + req.params.evaluationId
        });
    });
};
