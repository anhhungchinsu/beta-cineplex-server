
const sql = require("./db.js");

// constructor
const Movie_Showing = function(movie_showing) {
  this.movie_showing_id = movie_showing.movie_showing_id;
  this.movie_showing_auditorium_id = movie_showing.movie_showing_auditorium_id;
  this.movie_showing_movie_id = movie_showing.movie_showing_movie_id;
  this.movie_showing_start_time = movie_showing.movie_showing_start_time;
};

Movie_Showing.create = (newmovie_showing, result) => {
  sql.query("INSERT INTO Movie_Showings SET ?", newmovie_showing, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("created Movie_Showing: ", { movie_showing_id: res.insertId, ...newmovie_showing });
    result(null, { movie_showing_id: res.insertId, ...newmovie_showing });
  });
};

Movie_Showing.findById = (movie_showing_id, result) => {
  sql.query(`SELECT * FROM Movie_Showings WHERE movie_showing_id = ${movie_showing_id}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found movie_showing: ", res[0]);
      result(null, res[0]);
      return;
    }

    // not found Movie_Showing with the id
    result({ kind: "not_found" }, null);
  });
};

Movie_Showing.getAll = result => {
  sql.query("SELECT * FROM Movie_Showings", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("movie_showings: ", res);
    result(null, res);
  });
};

Movie_Showing.updateById = (movie_showing_id, movie_showing, result) => {
  sql.query(
    "UPDATE Movie_Showings SET movie_showing_auditorium_id = ?, movie_showing_movie_id = ?, movie_showing_start_time = ? WHERE movie_showing_id = ?",
    [movie_showing.movie_showing_auditorium_id, movie_showing.movie_showing_movie_id, movie_showing.movie_showing_start_time, movie_showing_id],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }
      if (res.affectedRows == 0) {
        // not found movie_showing with the id
        result({ kind: "not_found" }, null);
        return;
      }

      console.log("updated movie_showing: ", { movie_showing_id: movie_showing_id, ...movie_showing });
      result(null, { movie_showing_id: movie_showing_id, ...movie_showing });
    }
  );
};

Movie_Showing.remove = (movie_showing_id, result) => {
  sql.query("DELETE FROM Movie_Showings WHERE movie_showing_id = ?", movie_showing_id, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    if (res.affectedRows == 0) {
      // not found Movie_Showing with the id
      result({ kind: "not_found" }, null);
      return;
    }

    console.log("deleted movie_showing with id: ", movie_showing_id);
    result(null, res);
  });
};

Movie_Showing.findByCinemaId = (cinema_id, result) => {
    sql.query(`SELECT DISTINCT Movies.movie_id, Movies.movie_name, Movies.movie_type, Movies.movie_time, Movies.movie_start_date, Movies.movie_image, Movies.movie_description, Movies.movie_director, Movies.movie_actor, Movies.movie_language, Movies.movie_time, Movies.movie_trailer FROM Movie_Showings 
    LEFT JOIN Movies ON Movie_Showings.movie_showing_movie_id = Movies.movie_id
    LEFT JOIN Auditoriums ON Auditoriums.auditorium_id = Movie_Showings.movie_showing_auditorium_id 
    WHERE auditorium_cinema_id = ${cinema_id}`, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }
  
      if (res.length) {
        console.log("found movie_name: ", res);
        result(null, res);
        return;
      }
  
      // not found Movie_Showing with the id
      result({ kind: "not_found" }, null);
    });
  };

  Movie_Showing.findByMovieId = (movie_id, result) => {
    sql.query(`SELECT * FROM Movie_Showings
    LEFT JOIN Auditoriums ON Auditoriums.auditorium_id = Movie_Showings.movie_showing_auditorium_id 
    WHERE movie_showing_movie_id = ${movie_id}`, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }
  
      if (res.length) {
        console.log("found movie_name: ", res);
        result(null, res);
        return;
      }
  
      // not found Movie_Showing with the id
      result({ kind: "not_found" }, null);
    });
  };

module.exports = Movie_Showing;
