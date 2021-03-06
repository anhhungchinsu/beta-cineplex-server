
const sql = require("./db.js");

// constructor
const User = function(user) {
  this.user_id = user.user_id;
  this.user_name = user.user_name;
  this.user_pass = user.user_pass;
  this.user_age = user.user_age;
  this.user_phone = user.user_phone;
  this.user_address = user.user_address;
  this.user_role = user.user_role;
};

User.create = (newUser, result) => {
  sql.query("INSERT INTO Users SET ?", newUser, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("created user: ", { user_id: res.insertId, ...newUser });
    result(null, { user_id: res.insertId, ...newUser });
  });
};

User.findById = (user_id, result) => {
  sql.query(`SELECT * FROM Users WHERE user_id = ${user_id}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found user: ", res[0]);
      result(null, res[0]);
      return;
    }

    // not found User with the id
    result({ kind: "not_found" }, null);
  });
};

User.getAll = result => {
  sql.query("SELECT * FROM Users", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("users: ", res);
    result(null, res);
  });
};

User.updateById = (user_id, user, result) => {
  sql.query(
    "UPDATE Users SET user_name = ?, user_pass = ?, user_age = ?, user_phone = ?, user_address = ?, user_role = ? WHERE user_id = ?",
    [user.user_name, user.user_pass, user.user_age, user.user_phone, user.user_address, user.user_role, user_id],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }
      if (res.affectedRows == 0) {
        // not found user with the id
        result({ kind: "not_found" }, null);
        return;
      }

      console.log("updated user: ", { user_id: user_id, ...user });
      result(null, { user_id: user_id, ...user });
    }
  );
};

User.remove = (user_id, result) => {
  sql.query("DELETE FROM Users WHERE user_id = ?", user_id, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    if (res.affectedRows == 0) {
      // not found User with the id
      result({ kind: "not_found" }, null);
      return;
    }

    console.log("deleted user with id: ", user_id);
    result(null, res);
  });
};

module.exports = User;
