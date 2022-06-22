const sql = require("./db.js");

// constructor
const Cosa = function (cosa) {
  this.name = cosa.name;
  this.description = cosa.description;
};

Cosa.create = (newCosa, result) => {
  sql.query("INSERT INTO cosas SET ?", newCosa, (err, res) => {
    if (err) {
      console.log("💽 error: ", err);
      result(err, null);
      return;
    }
    console.log("💽 created cosa: ", { id: res.insertId, ...newCosa });
    result(null, { id: res.insertId, ...newCosa });
  });
};

Cosa.findById = (id, result) => {
  sql.query(`SELECT * FROM cosas WHERE id = ${id}`, (err, res) => {
    if (err) {
      console.log("💽 error: ", err);
      result(err, null);
      return;
    }
    if (res.length) {
      console.log("💽 found cosa: ", res[0]);
      result(null, res[0]);
      return;
    }
    // not found Cosa with the id
    result({ kind: "not_found" }, null);
  });
};

Cosa.getAll = (name, result) => {
  let query = "SELECT * FROM cosas";
  if (name) {
    query += ` WHERE name LIKE '%${name}%'`;
  }
  sql.query(query, (err, res) => {
    if (err) {
      console.log("💽 error: ", err);
      result(null, err);
      return;
    }
    console.log("💽 cosas: ", res);
    result(null, res);
  });
};

// Cosa.getAllPublished = (result) => {
//   sql.query("SELECT * FROM cosas WHERE published=true", (err, res) => {
//     if (err) {
//       console.log("💽 error: ", err);
//       result(null, err);
//       return;
//     }
//     console.log("💽 cosas: ", res);
//     result(null, res);
//   });
// };

Cosa.updateById = (id, cosa, result) => {
  sql.query(
    "UPDATE cosas SET name = ?, description = ? WHERE id = ?",
    [cosa.name, cosa.description, id],
    (err, res) => {
      if (err) {
        console.log("💽 error: ", err);
        result(null, err);
        return;
      }
      if (res.affectedRows == 0) {
        // not found Cosa with the id
        result({ kind: "not_found" }, null);
        return;
      }
      console.log("💽 updated cosa: ", { id: id, ...cosa });
      result(null, { id: id, ...cosa });
    }
  );
};

Cosa.remove = (id, result) => {
  sql.query("DELETE FROM cosas WHERE id = ?", id, (err, res) => {
    if (err) {
      console.log("💽 error: ", err);
      result(null, err);
      return;
    }
    if (res.affectedRows == 0) {
      // not found Cosa with the id
      result({ kind: "not_found" }, null);
      return;
    }
    console.log("💽 deleted cosa with id: ", id);
    result(null, res);
  });
};

Cosa.removeAll = (result) => {
  sql.query("DELETE FROM cosas", (err, res) => {
    if (err) {
      console.log("💽 error: ", err);
      result(null, err);
      return;
    }
    console.log(`deleted ${res.affectedRows} cosas`);
    result(null, res);
  });
};
module.exports = Cosa;
