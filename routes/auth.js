var express = require("express");
var router = express.Router();

var authController = require("../controllers/authController");

//register routes
router.post("/api/v1/register", authController.postRegister);
router.get("/api/v1/register", function (req, res, next) {
  res.render("index", { title: "Express" });
});

//login routes
router.post("/api/v1/login", function (req, res, next) {
  res.render("index", { title: "Express" });
});
router.get("/api/v1/login", function (req, res, next) {
  res.render("index", { title: "Express" });
});

//logout routes
router.post("/api/v1/logout", function (req, res, next) {
  res.render("index", { title: "Express" });
});

module.exports = router;
