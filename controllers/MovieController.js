
const Movie = require("../models/Movie");

// Create and Save a new Movie
exports.create = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  // Create a Movie
  const movie = new Movie({
    movie_id : req.body.movie_id,
    movie_name : req.body.movie_name,
    movie_description : req.body.movie_description,
    movie_director : req.body.movie_director,
    movie_actor : req.body.movie_actor,
    movie_type : req.body.movie_type,
    movie_time : req.body.movie_time,
    movie_language : req.body.movie_language,
    movie_start_date : req.body.movie_start_date,
    movie_image : req.body.movie_image,
    movie_trailer : req.body.movie_trailer
  });

  // Save Movie in the database
  Movie.create(movie, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Movie."
      });
    else res.send(data);
  });
};

// Retrieve all Movies from the database.
exports.findAll = (req, res) => {
  Movie.getAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving Movies."
      });
    else res.send(data);
  });
};

// Find a single Movie with a movie_id
exports.findOne = (req, res) => {
  Movie.findById(req.params.movie_id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Movie with id ${req.params.movie_id}.`
        });
      } else {
        res.status(500).send({
          message: "Error retrieving Customer with id " + req.params.movie_id
        });
      }
    } else res.send(data);
  });
};

// Update a Movie identified by the movie_id in the request
exports.update = (req, res) => {
  // Validate Request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  console.log(req.body);

  Movie.updateById(
    req.params.movie_id,
    new Movie(req.body),
    (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found Movie with id ${req.params.movie_id}.`
          });
        } else {
          res.status(500).send({
            message: "Error updating Movie with id " + req.params.movie_id
          });
        }
      } else res.send(data);
    }
  );
};

// Delete a Movie with the specified movie_id in the request
exports.delete = (req, res) => {
  Movie.remove(req.params.movie_id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Movie with id ${req.params.movie_id}.`
        });
      } else {
        res.status(500).send({
          message: "Could not delete Movie with id " + req.params.movie_id
        });
      }
    } else res.send({ message: `Movie was deleted successfully!` });
  });
};
