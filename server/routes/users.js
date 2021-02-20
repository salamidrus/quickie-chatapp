const express = require("express");
const router = express.Router();
const passport = require("passport");
const userControllers = require("../controllers.js/users");

router.get(
  "/",
  passport.authenticate("jwt", { session: false }),
  userControllers.GetAll
);

module.exports = router;
