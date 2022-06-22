const Cosa = require("../models/cosa.model.js");

// Create and Save a new Cosa
exports.create = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!",
    });
  }
  // Create a Cosa
  const cosa = new Cosa({
    name: req.body.name,
    description: req.body.description,
    //   published: req.body.published || false
  });
  // Save Cosa in the database
  Cosa.create(cosa, (err, data) => {
    if (err)
      res.status(500).send({
        message: err.message || "Some error occurred while creating the Cosa.",
      });
    else res.send(data);
  });
};

// Retrieve all Cosas from the database (with condition).
exports.findAll = (req, res) => {
  const name = req.query.name;
  Cosa.getAll(name, (err, data) => {
    if (err)
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving cosas.",
      });
    else res.send(data);
  });
};

//   exports.findAllPublished = (req, res) => {
//     Cosa.getAllPublished((err, data) => {
//       if (err)
//         res.status(500).send({
//           message:
//             err.message || "Some error occurred while retrieving cosas."
//         });
//       else res.send(data);
//     });
//   };

// Find a single Cosa with a id
exports.findOne = (req, res) => {
  Cosa.findById(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Cosa with id ${req.params.id}.`,
        });
      } else {
        res.status(500).send({
          message: "Error retrieving Cosa with id " + req.params.id,
        });
      }
    } else res.send(data);
  });
};

// Update a Cosa identified by the id in the request
exports.update = (req, res) => {
  // Validate Request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!",
    });
  }
  // console.log(req.body);
  Cosa.updateById(req.params.id, new Cosa(req.body), (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Cosa with id ${req.params.id}.`,
        });
      } else {
        res.status(500).send({
          message: "Error updating Cosa with id " + req.params.id,
        });
      }
    } else res.send(data);
  });
};

// Delete a Cosa with the specified id in the request
exports.delete = (req, res) => {
  Cosa.remove(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Cosa with id ${req.params.id}.`,
        });
      } else {
        res.status(500).send({
          message: "Could not delete Cosa with id " + req.params.id,
        });
      }
    } else res.send({ message: `Cosa was deleted successfully!` });
  });
};

// Delete all Cosas from the database.
exports.deleteAll = (req, res) => {
  Cosa.removeAll((err, data) => {
    if (err)
      res.status(500).send({
        message: err.message || "Some error occurred while removing all cosas.",
      });
    else res.send({ message: `All Cosas were deleted successfully!` });
  });
};
