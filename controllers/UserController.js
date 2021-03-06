
const User = require("../models/User");

// Create and Save a new User
exports.create = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  // Create a User
  const user = new User({
    user_id : req.body.user_id,
    user_name : req.body.user_name,
    user_pass : req.body.user_pass,
    user_age : req.body.user_age,
    user_phone : req.body.user_phone,
    user_address : req.body.user_address,
    user_role : req.body.user_role
  });

  // Save User in the database
  User.create(user, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the User."
      });
    else res.send(data);
  });
};

// Retrieve all Users from the database.
exports.findAll = (req, res) => {
  User.getAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving Users."
      });
    else res.send(data);
  });
};

// Find a single User with a user_id
exports.findOne = (req, res) => {
  User.findById(req.params.user_id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found User with id ${req.params.user_id}.`
        });
      } else {
        res.status(500).send({
          message: "Error retrieving Customer with id " + req.params.user_id
        });
      }
    } else res.send(data);
  });
};

// Update a User identified by the user_id in the request
exports.update = (req, res) => {
  // Validate Request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  console.log(req.body);

  User.updateById(
    req.params.user_id,
    new User(req.body),
    (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found User with id ${req.params.user_id}.`
          });
        } else {
          res.status(500).send({
            message: "Error updating User with id " + req.params.user_id
          });
        }
      } else res.send(data);
    }
  );
};

// Delete a User with the specified user_id in the request
exports.delete = (req, res) => {
  User.remove(req.params.user_id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found User with id ${req.params.user_id}.`
        });
      } else {
        res.status(500).send({
          message: "Could not delete User with id " + req.params.user_id
        });
      }
    } else res.send({ message: `User was deleted successfully!` });
  });
};
