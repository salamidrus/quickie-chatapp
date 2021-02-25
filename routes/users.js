const express = require("express");
const router = express.Router();
const passport = require("passport");
const userControllers = require("../controllers.js/users");

router.get(
  "/",
  passport.authenticate("jwt", { session: false }),
  userControllers.GetAll
);

router.post("/register", userControllers.Register);
router.post("/login", userControllers.Login);

module.exports = router;
