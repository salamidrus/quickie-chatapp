const User = require("../models/User");

exports.GetAll = async (req, res) => {
  try {
    let data = await User.find({ _id: { $ne: req.user.id } });

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
