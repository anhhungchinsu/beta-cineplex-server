
const sql = require("./db.js");

// constructor
const Ticket = function(ticket) {
  this.ticket_id = ticket.ticket_id;
  this.ticket_movie_showing_id = ticket.ticket_movie_showing_id;
  this.ticket_user_id = ticket.ticket_user_id;
  this.ticket_date = ticket.ticket_date;
};

Ticket.create = (newTicket, result) => {
  sql.query("INSERT INTO Tickets SET ?", newTicket, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("created ticket: ", { ticket_id: res.insertId, ...newTicket });
    result(null, { ticket_id: res.insertId, ...newTicket });
  });
};

Ticket.findById = (ticket_id, result) => {
  sql.query(`SELECT * FROM Tickets WHERE ticket_id = ${ticket_id}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found ticket: ", res[0]);
      result(null, res[0]);
      return;
    }

    // not found Ticket with the id
    result({ kind: "not_found" }, null);
  });
};

Ticket.getAll = result => {
  sql.query("SELECT * FROM Tickets", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("tickets: ", res);
    result(null, res);
  });
};

Ticket.updateById = (ticket_id, ticket, result) => {
  sql.query(
    "UPDATE Tickets SET ticket_movie_showing_id = ?, ticket_user_id = ?, ticket_date = ?, WHERE ticket_id = ?",
    [ticket.ticket_movie_showing_id, ticket.ticket_user_id, ticket.ticket_date, ticket_id],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }
      if (res.affectedRows == 0) {
        // not found ticket with the id
        result({ kind: "not_found" }, null);
        return;
      }

      console.log("updated ticket: ", { ticket_id: ticket_id, ...ticket });
      result(null, { ticket_id: ticket_id, ...ticket });
    }
  );
};

Ticket.remove = (ticket_id, result) => {
  sql.query("DELETE FROM Tickets WHERE ticket_id = ?", ticket_id, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    if (res.affectedRows == 0) {
      // not found Ticket with the id
      result({ kind: "not_found" }, null);
      return;
    }

    console.log("deleted ticket with id: ", ticket_id);
    result(null, res);
  });
};

Ticket.findByUserId = (ticket_user_id, result) => {
    sql.query(`SELECT * FROM Tickets
    LEFT JOIN Movie_Showings ON Tickets.ticket_movie_showing_id = Movie_Showings.movie_showing_id
    LEFT JOIN Movies ON Movie_Showings.movie_showing_id = Movies.movie_id
    WHERE ticket_user_id = ${ticket_user_id}`, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }
  
      if (res.length) {
        console.log("found ticket: ", res);
        result(null, res);
        return;
      }
  
      // not found Ticket with the id
      result({ kind: "not_found" }, null);
    });
  };

module.exports = Ticket;
