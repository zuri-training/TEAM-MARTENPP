//initial setup
require("dotenv").config();
const express = require("express");
const{ json } = require('express');
const routes = require("./routes/router");
const controller = require("./controllers/userController");
const connectDB = require('./config/database');
const app = express();

//connect to the database
connectDB();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/", routes);

// Routes

app.route("/", routes);

const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`Server is listening on port ${port}....`);
});
