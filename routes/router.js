const express = require("express");

const route = express.Router();

const user = require("../controllers/userController");
const debtor = require("../controllers/debtorController");

route.get("/", (req, res) => {
  res.send("Your Route is working");
});

route.get("/api/all-schools", user.getAllSchools)
      .get("/api/all-schools/:id", user.getSchoolById)
      .get("/api/all-schools/:name", user.getSchoolByName)
      .patch("/api/all-schools/:id", user.updateProfile)
      .delete("/api/all-schools/:id", user.deleteUser)
      .get("/api/all-schools/?id", user.getAllDebtorsOneSchool);
      


route.post("/api/debtors", user.addDebtor)
    .get("/api/debtors", debtor.getAllDebtors)
    .get("/api/debtors/:id", debtor.getDebtorById)
    .get("/api/debtors/:name", debtor.getDebtorByName)
    // .patch("/api/debtors/:id",debtor.updateDebtor)
    .delete("/api/debtors/:id", user.removeDebtor);
    

module.exports = route;
