
const sql = require("./db.js");

// constructor
const Cinema = function(cinema) {
  this.cinema_id = cinema.cinema_id;
  this.cinema_name = cinema.cinema_name;
  this.cinema_address = cinema.cinema_address;
  this.cinema_phone = cinema.cinema_phone;
  this.cinema_image = cinema.cinema_image;
  this.cinema_post = cinema.cinema_post;
};

Cinema.create = (newcinema, result) => {
  sql.query("INSERT INTO Cinemas SET ?", newcinema, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("created Cinema: ", { cinema_id: res.insertId, ...newcinema });
    result(null, { cinema_id: res.insertId, ...newcinema });
  });
};

Cinema.findById = (cinema_id, result) => {
  sql.query(`SELECT * FROM Cinemas WHERE cinema_id = ${cinema_id}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found cinema: ", res[0]);
      result(null, res[0]);
      return;
    }

    // not found Cinema with the id
    result({ kind: "not_found" }, null);
  });
};

Cinema.getAll = result => {
  sql.query("SELECT * FROM Cinemas", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("cinemas: ", res);
    result(null, res);
  });
};

Cinema.updateById = (cinema_id, cinema, result) => {
  sql.query(
    "UPDATE Cinemas SET cinema_name = ?, cinema_address = ?, cinema_phone = ?, cinema_image = ?, cinema_post = ? WHERE cinema_id = ?",
    [cinema.cinema_name, cinema.cinema_address, cinema.cinema_phone, cinema.cinema_image, cinema.cinema_post, cinema_id],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }
      if (res.affectedRows == 0) {
        // not found cinema with the id
        result({ kind: "not_found" }, null);
        return;
      }

      console.log("updated cinema: ", { cinema_id: cinema_id, ...cinema });
      result(null, { cinema_id: cinema_id, ...cinema });
    }
  );
};

Cinema.remove = (cinema_id, result) => {
  sql.query("DELETE FROM Cinemas WHERE cinema_id = ?", cinema_id, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    if (res.affectedRows == 0) {
      // not found Cinema with the id
      result({ kind: "not_found" }, null);
      return;
    }

    console.log("deleted cinema with id: ", cinema_id);
    result(null, res);
  });
};

module.exports = Cinema;
