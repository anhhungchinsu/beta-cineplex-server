const Cinema = require("../models/Cinema");

// Create and Save a new Cinema
exports.create = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  // Create a Cinema
  const cinema = new Cinema({
    cinema_id : req.body.cinema_id,
    cinema_name : req.body.cinema_name,
    cinema_address : req.body.cinema_address,
    cinema_phone : req.body.cinema_phone,
    cinema_image : req.body.cinema_image,
    cinema_post : req.body.cinema_post
  });

  // Save Cinema in the database
  Cinema.create(cinema, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Cinema."
      });
    else res.send(data);
  });
};

// Retrieve all Cinemas from the database.
exports.findAll = (req, res) => {
  Cinema.getAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving Cinemas."
      });
    else res.send(data);
  });
};

// Find a single Cinema with a cinema_id
exports.findOne = (req, res) => {
  Cinema.findById(req.params.cinema_id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Cinema with id ${req.params.cinema_id}.`
        });
      } else {
        res.status(500).send({
          message: "Error retrieving Customer with id " + req.params.cinema_id
        });
      }
    } else res.send(data);
  });
};

// Update a Cinema identified by the cinema_id in the request
exports.update = (req, res) => {
  // Validate Request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  console.log(req.body);

  Cinema.updateById(
    req.params.cinema_id,
    new Cinema(req.body),
    (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found Cinema with id ${req.params.cinema_id}.`
          });
        } else {
          res.status(500).send({
            message: "Error updating Cinema with id " + req.params.cinema_id
          });
        }
      } else res.send(data);
    }
  );
};

// Delete a Cinema with the specified cinema_id in the request
exports.delete = (req, res) => {
  Cinema.remove(req.params.cinema_id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Cinema with id ${req.params.cinema_id}.`
        });
      } else {
        res.status(500).send({
          message: "Could not delete Cinema with id " + req.params.cinema_id
        });
      }
    } else res.send({ message: `Cinema was deleted successfully!` });
  });
};
