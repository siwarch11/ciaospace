const Offre = require("../models/offre.model.js");

// Create and Save a new offre
exports.create = (req, res) => {
  // Validate request
  if (!req.body.title) {
    return res.status(400).send({
      message: "offre content can not be empty",
    });
  }

  // Create a offre
  const offre = new Offre({
    title: req.body.title || "Untitled Offre",
    description: req.body.description,
    date: req.body.date,
    discount: req.body.discount,
    image: req.body.image,
    price: req.body.price,
    category: req.body.category,
    localisation: req.body.localisation,
    number: req.body.number,
    page: req.body.page,
    position: req.body.position, 
    facility: req.body.facility,
    cancellation: req.body.cancellation,
    period: req.body.period,
    companion: req.body.companion,
    specialoffer: req.body.specialoffer,
    kitchen: req.body.kitchen,
    activities: req.body.activities,
    openingtime: req.body.openingtime,
    closingtime: req.body.closingtime,

    region: req.body.region,
    email: req.body.email,
    idPart: req.body.idPart,

    status: req.body.status,
  });

  // Save offre in the database
  offre
    .save()
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while creating the offre.",
      });
    });
};

// Retrieve and return all offre from the database.
exports.findAll = (req, res) => {
  Offre.find()
    .then((offres) => {
      res.send(offres);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving offres.",
      });
    });
};

// Find a single offre with a offreId
exports.findOne = (req, res) => {
  Offre.findById(req.params.offreId)
    .then((offre) => {
      if (!offre) {
        return res.status(404).send({
          message: "offre not found with id " + req.params.offreId,
        });
      }
      res.send(offre);
    })
    .catch((err) => {
      if (err.kind === "ObjectId") {
        return res.status(404).send({
          message: "offre not found with id " + req.params.offreId,
        });
      }
      return res.status(500).send({
        message: "Error retrieving offre with id " + req.params.offreId,
      });
    });
};

// Update a offre identified by the offreId in the request
exports.update = (req, res) => {
  // Validate Request
  if (!req.body.title) {
    return res.status(400).send({
      message: "offre content can not be empty",
    });
  }

  // Find offre and update it with the request body
  Offre.findByIdAndUpdate(
    req.params.offreId,
    {
      title: req.body.title || "Untitled Offre",
      description: req.body.description,
      date: req.body.date,
      discount: req.body.discount,
      image: req.body.image,
      price: req.body.price,
      category: req.body.category,
      localisation: req.body.localisation,
      number: req.body.number,
      page: req.body.page,
      position: req.body.position,
      facility: req.body.facility,
      cancellation: req.body.cancellation,
      period: req.body.period,
      companion: req.body.companion,
      specialoffer: req.body.specialoffer,
      kitchen: req.body.kitchen,
      activities: req.body.activities,
      openingtime: req.body.openingtime,
      closingtime: req.body.closingtime,

      region: req.body.region,
      email: req.body.email,
      idPart: req.body.idPart,
      status: req.body.status,
    },
    { new: true }
  )
    .then((offre) => {
      if (!offre) {
        return res.status(404).send({
          message: "offre not found with id " + req.params.offreId,
        });
      }
      res.send(offre);
    })
    .catch((err) => {
      if (err.kind === "ObjectId") {
        return res.status(404).send({
          message: "offre not found with id " + req.params.offreId,
        });
      }
      return res.status(500).send({
        message: "Error updating offre with id " + req.params.offreId,
      });
    });
};

// Delete a offre with the specified offreId in the request
exports.delete = (req, res) => {
  Offre.findByIdAndRemove(req.params.offreId)
    .then((offre) => {
      if (!offre) {
        return res.status(404).send({
          message: "offre not found with id " + req.params.offreId,
        });
      }
      res.send({ message: "offre deleted successfully!" });
    })
    .catch((err) => {
      if (err.kind === "ObjectId" || err.name === "NotFound") {
        return res.status(404).send({
          message: "offre not found with id " + req.params.offreId,
        });
      }
      return res.status(500).send({
        message: "Could not delete offre with id " + req.params.offreId,
      });
    });
};
