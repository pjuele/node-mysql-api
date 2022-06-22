module.exports = (app) => {
  const cosa = require("../controllers/cosa.controller.js");
  var router = require("express").Router();
  // Create a new Cosa
  router.post("/", cosa.create);
  // Retrieve all Cosas
  router.get("/", cosa.findAll);
  // // Retrieve all published Cosas
  // router.get("/published", cosa.findAllPublished);
  // Retrieve a single Cosa with id
  router.get("/:id", cosa.findOne);
  // Update a Cosa with id
  router.put("/:id", cosa.update);
  // Delete a Cosa with id
  router.delete("/:id", cosa.delete);
  // Delete all Cosas
  router.delete("/", cosa.deleteAll);
  app.use("/api/cosas", router);
};
