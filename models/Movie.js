
const sql = require("./db.js");

// constructor
const Movie = function(movie) {
  this.movie_id = movie.movie_id;
  this.movie_name = movie.movie_name;
  this.movie_description = movie.movie_description;
  this.movie_director = movie.movie_director;
  this.movie_actor = movie.movie_actor;
  this.movie_type = movie.movie_type;
  this.movie_time = movie.movie_time;
  this.movie_language = movie.movie_language;
  this.movie_start_date = movie.movie_start_date
  this.movie_image = movie.movie_image
  this.movie_trailer = movie.movie_trailer;
};

Movie.create = (newMovie, result) => {
  sql.query("INSERT INTO Movies SET ?", newMovie, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("created movie: ", { movie_id: res.insertId, ...newMovie });
    result(null, { movie_id: res.insertId, ...newMovie });
  });
};

Movie.findById = (movie_id, result) => {
  sql.query(`SELECT * FROM Movies WHERE movie_id = ${movie_id}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found movie: ", res[0]);
      result(null, res[0]);
      return;
    }

    // not found Movie with the id
    result({ kind: "not_found" }, null);
  });
};

Movie.getAll = result => {
  sql.query("SELECT * FROM Movies", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("movies: ", res);
    result(null, res);
  });
};

Movie.updateById = (movie_id, movie, result) => {
  sql.query(
    "UPDATE Movies SET movie_name = ?, movie_description = ?, movie_director = ?, movie_actor = ?, movie_type = ?, movie_time = ?, movie_language = ?, movie_start_date = ?, movie_image = ?, movie_trailer = ? WHERE movie_id = ?",
    [movie.movie_name, movie.movie_description, movie.movie_director, movie.movie_actor, movie.movie_type, movie.movie_time, movie.movie_language, movie.movie_start_date, movie_image, movie.movie_trailer, movie_id],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }
      if (res.affectedRows == 0) {
        // not found movie with the id
        result({ kind: "not_found" }, null);
        return;
      }

      console.log("updated movie: ", { movie_id: movie_id, ...movie });
      result(null, { movie_id: movie_id, ...movie });
    }
  );
};

Movie.remove = (movie_id, result) => {
  sql.query("DELETE FROM Movies WHERE movie_id = ?", movie_id, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    if (res.affectedRows == 0) {
      // not found Movie with the id
      result({ kind: "not_found" }, null);
      return;
    }

    console.log("deleted movie with id: ", movie_id);
    result(null, res);
  });
};

module.exports = Movie;
