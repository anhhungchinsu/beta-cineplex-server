
const Ticket = require("../models/Ticket");

// Create and Save a new Ticket
exports.create = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  // Create a Ticket
  const ticket = new Ticket({
    ticket_id : req.body.ticket_id,
    ticket_movie_showing_id : req.body.ticket_movie_showing_id,
    ticket_user_id : req.body.ticket_user_id,
    ticket_date : req.body.ticket_date
  });

  // Save Ticket in the database
  Ticket.create(ticket, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Ticket."
      });
    else res.send(data);
  });
};

// Retrieve all Tickets from the database.
exports.findAll = (req, res) => {
  Ticket.getAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving Tickets."
      });
    else res.send(data);
  });
};

// Find a single Ticket with a ticket_id
exports.findOne = (req, res) => {
  Ticket.findById(req.params.ticket_id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Ticket with id ${req.params.ticket_id}.`
        });
      } else {
        res.status(500).send({
          message: "Error retrieving Customer with id " + req.params.ticket_id
        });
      }
    } else res.send(data);
  });
};

// Update a Ticket identified by the ticket_id in the request
exports.update = (req, res) => {
  // Validate Request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  Ticket.updateById(
    req.params.ticket_id,
    new Ticket(req.body),
    (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found Ticket with id ${req.params.ticket_id}.`
          });
        } else {
          res.status(500).send({
            message: "Error updating Ticket with id " + req.params.ticket_id
          });
        }
      } else res.send(data);
    }
  );
};

// Delete a Ticket with the specified ticket_id in the request
exports.delete = (req, res) => {
  Ticket.remove(req.params.ticket_id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Ticket with id ${req.params.ticket_id}.`
        });
      } else {
        res.status(500).send({
          message: "Could not delete Ticket with id " + req.params.ticket_id
        });
      }
    } else res.send({ message: `Ticket was deleted successfully!` });
  });
};

exports.findByUserId = (req, res) => {
  Ticket.findByUserId(req.params.ticket_user_id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Ticket with id ${req.params.ticket_user_id}.`
        });
      } else {
        res.status(500).send({
          message: "Error retrieving Customer with id " + req.params.ticket_user_id
        });
      }
    } else res.send(data);
  });
};

