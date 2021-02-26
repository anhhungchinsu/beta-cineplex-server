
const sql = require("./db.js");

// constructor
const Auditorium = function(auditorium) {
  this.auditorium_id = auditorium.auditorium_id;
  this.auditorium_cinema_id = auditorium.auditorium_cinema_id;
  this.auditorium_seats_available = auditorium.auditorium_seats_available;
};

Auditorium.create = (newauditorium, result) => {
  sql.query("INSERT INTO Auditoriums SET ?", newauditorium, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("created Auditorium: ", { auditorium_id: res.insertId, ...newauditorium });
    result(null, { auditorium_id: res.insertId, ...newauditorium });
  });
};

Auditorium.findById = (auditorium_id, result) => {
  sql.query(`SELECT * FROM Auditoriums WHERE auditorium_id = ${auditorium_id}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found auditorium: ", res[0]);
      result(null, res[0]);
      return;
    }

    // not found Auditorium with the id
    result({ kind: "not_found" }, null);
  });
};

Auditorium.getAll = result => {
  sql.query("SELECT * FROM Auditoriums", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("auditoriums: ", res);
    result(null, res);
  });
};

Auditorium.updateById = (auditorium_id, auditorium, result) => {
  sql.query(
    "UPDATE Auditoriums SET auditorium_cinema_id = ?, auditorium_seats_available = ? WHERE auditorium_id = ?",
    [auditorium.auditorium_cinema_id, auditorium.auditorium_seats_available, auditorium_id],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }
      if (res.affectedRows == 0) {
        // not found auditorium with the id
        result({ kind: "not_found" }, null);
        return;
      }

      console.log("updated auditorium: ", { auditorium_id: auditorium_id, ...auditorium });
      result(null, { auditorium_id: auditorium_id, ...auditorium });
    }
  );
};

Auditorium.remove = (auditorium_id, result) => {
  sql.query("DELETE FROM Auditoriums WHERE auditorium_id = ?", auditorium_id, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    if (res.affectedRows == 0) {
      // not found Auditorium with the id
      result({ kind: "not_found" }, null);
      return;
    }

    console.log("deleted auditorium with id: ", auditorium_id);
    result(null, res);
  });
};

module.exports = Auditorium;
