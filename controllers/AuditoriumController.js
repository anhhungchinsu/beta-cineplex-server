const Auditorium = require("../models/Auditorium");

// Create and Save a new Auditorium
exports.create = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  // Create a Auditorium
  const auditorium = new Auditorium({
    auditorium_id : req.body.auditorium_id,
    auditorium_cinema_id : req.body.auditorium_cinema_id,
    auditorium_seats_available : req.body.auditorium_seats_available
  });

  // Save Auditorium in the database
  Auditorium.create(auditorium, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Auditorium."
      });
    else res.send(data);
  });
};

// Retrieve all Auditoriums from the database.
exports.findAll = (req, res) => {
  Auditorium.getAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving Auditoriums."
      });
    else res.send(data);
  });
};

// Find a single Auditorium with a auditorium_id
exports.findOne = (req, res) => {
  Auditorium.findById(req.params.auditorium_id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Auditorium with id ${req.params.auditorium_id}.`
        });
      } else {
        res.status(500).send({
          message: "Error retrieving Customer with id " + req.params.auditorium_id
        });
      }
    } else res.send(data);
  });
};

// Update a Auditorium identified by the auditorium_id in the request
exports.update = (req, res) => {
  // Validate Request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  console.log(req.body);

  Auditorium.updateById(
    req.params.auditorium_id,
    new Auditorium(req.body),
    (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found Auditorium with id ${req.params.auditorium_id}.`
          });
        } else {
          res.status(500).send({
            message: "Error updating Auditorium with id " + req.params.auditorium_id
          });
        }
      } else res.send(data);
    }
  );
};

// Delete a Auditorium with the specified auditorium_id in the request
exports.delete = (req, res) => {
  Auditorium.remove(req.params.auditorium_id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Auditorium with id ${req.params.auditorium_id}.`
        });
      } else {
        res.status(500).send({
          message: "Could not delete Auditorium with id " + req.params.auditorium_id
        });
      }
    } else res.send({ message: `Auditorium was deleted successfully!` });
  });
};
