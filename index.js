require("dotenv").config();
const express = require("express");
const routes = require("./routes/router");
const controller = require("./controllers/controller");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/", routes);

// Routes

app.route("/", routes);

const port = process.env.PORT;

app.listen(port, () => {
  console.log(`server is listening on port ${port}`);
});
