const User = require("../models/User");

// Validators
const validateRegisterInput = require("../validation/register");
const validateLoginInput = require("../validation/login");
// Library
const jwt = require("jsonwebtoken");
const SECRET_KEY = process.env.SECRET_KEY;

exports.GetAll = async (req, res) => {
  try {
    let data = await User.find({ _id: { $ne: req.user.id } }).select(
      "-password"
    );

    res.status(200).json({
      success: true,
      message: "Success to retrieve all users",
      data,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Failure to Get the Data!",
    });
  }
};

exports.Register = async (req, res) => {
  try {
    // Form Validation
    const { errors, isValid } = validateRegisterInput(req.body);

    if (!isValid)
      return res.status(400).json({
        success: false,
        errors,
      });

    let checkUser = await User.findOne({ username: req.body.username });

    if (checkUser)
      return res.status(400).json({
        success: false,
        message: "Username already exists!",
      });

    let newUser = await User.create(req.body);

    let payload = {
      id: newUser.id,
      name: newUser.name,
    };

    // Sign token
    let token = await jwt.sign(payload, SECRET_KEY);

    req.io.sockets.emit("users", newUser.username);

    res.status(200).json({
      success: true,
      message: "Successfully register the token!",
      token: "Bearer " + token,
      name: newUser.name,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message || "Failure to create the data!",
    });
  }
  // Hash password before saving in database
};
