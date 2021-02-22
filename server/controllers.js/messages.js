const Message = require("../models/Message");
const Conversation = require("../models/Conversation");
const GlobalMessage = require("../models/GlobalMessage");

exports.GetAllGlobalMessages = async (req, res) => {
  try {
    let data = await GlobalMessage.find().populate("from", "username name");

    res.status(200).json({
      success: true,
      messages: "Successfully get all the messages!",
      data,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Failure to Get the Data!",
    });
  }
};
