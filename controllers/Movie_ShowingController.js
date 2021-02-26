const Movie_Showing = require("../models/Movie_Showing");

// Create and Save a new Movie_Showing
exports.create = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  // Create a Movie_Showing
  const movie_showing = new Movie_Showing({
    movie_showing_id : req.body.movie_showing_id,
    movie_showing_auditorium_id : req.body.movie_showing_auditorium_id,
    movie_showing_movie_id : req.body.movie_showing_movie_id,
    movie_showing_start_time : req.body.movie_showing_start_time
  });

  // Save Movie_Showing in the database
  Movie_Showing.create(movie_showing, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Movie_Showing."
      });
    else res.send(data);
  });
};

// Retrieve all Movie_Showings from the database.
exports.findAll = (req, res) => {
  Movie_Showing.getAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving Movie_Showings."
      });
    else res.send(data);
  });
};

// Find a single Movie_Showing with a movie_showing_id
exports.findOne = (req, res) => {
  Movie_Showing.findById(req.params.movie_showing_id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Movie_Showing with id ${req.params.movie_showing_id}.`
        });
      } else {
        res.status(500).send({
          message: "Error retrieving Customer with id " + req.params.movie_showing_id
        });
      }
    } else res.send(data);
  });
};

// Update a Movie_Showing identified by the movie_showing_id in the request
exports.update = (req, res) => {
  // Validate Request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  console.log(req.body);

  Movie_Showing.updateById(
    req.params.movie_showing_id,
    new Movie_Showing(req.body),
    (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found Movie_Showing with id ${req.params.movie_showing_id}.`
          });
        } else {
          res.status(500).send({
            message: "Error updating Movie_Showing with id " + req.params.movie_showing_id
          });
        }
      } else res.send(data);
    }
  );
};

// Delete a Movie_Showing with the specified movie_showing_id in the request
exports.delete = (req, res) => {
  Movie_Showing.remove(req.params.movie_showing_id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Movie_Showing with id ${req.params.movie_showing_id}.`
        });
      } else {
        res.status(500).send({
          message: "Could not delete Movie_Showing with id " + req.params.movie_showing_id
        });
      }
    } else res.send({ message: `Movie_Showing was deleted successfully!` });
  });
};

// Find a single Movie_Showing with a cinema
exports.findByCinema = (req, res) => {
    Movie_Showing.findByCinemaId(req.params.cinema_id, (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found Movie_Showing with id ${req.params.cinema_id}.`
          });
        } else {
          res.status(500).send({
            message: "Error retrieving Customer with id " + req.params.cinema_id
          });
        }
      } else res.send(data);
    });
};

// Find Movie_Showing with a movie_id
exports.findByMovieId = (req, res) => {
  Movie_Showing.findByMovieId(req.params.movie_showing_movie_id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Movie_Showing with id ${req.params.movie_showing_movie_id}.`
        });
      } else {
        res.status(500).send({
          message: "Error retrieving Customer with id " + req.params.movie_showing_movie_id
        });
      }
    } else res.send(data);
  });
};
