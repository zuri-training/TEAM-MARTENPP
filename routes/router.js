const express = require("express");

const route = express.Router();

// const controller = require("../controllers/controllers");

route.get("/", (req, res) => {
  res.send("Your Route is working");
});

module.exports = route;
