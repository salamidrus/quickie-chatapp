const Message = require("../models/Message");
const Conversation = require("../models/Conversation");
const GlobalMessage = require("../models/GlobalMessage");

// library
const mongoose = require("mongoose");

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

exports.CreateGlobalMessage = async (req, res) => {
  try {
    let data = await GlobalMessage.create({
      from: req.user.userId,
      body: req.body.body,
    });

    req.io.sockets.emit("messages", req.body.body);

    res.status(200).json({
      success: true,
      message: "Successfully create global message!",
      data,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Failure to Get the Data!",
    });
  }
};

exports.GetConversations = async (req, res) => {
  try {
    let from = mongoose.Types.ObjectId(req.user.userId);
    let data = await Conversation.find({
      recipients: {
        $all: [{ $elemMatch: { $eq: from } }],
      },
    });

    res.status(200).json({
      success: true,
      message: "Successfully get the conversations!",
      data,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Failure to Get the Data!",
    });
  }
};
