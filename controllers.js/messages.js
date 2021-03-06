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
      message: err.message || "Failure to Get the Data!",
    });
  }
};

exports.CreateGlobalMessage = async (req, res) => {
  try {
    let data = await GlobalMessage.create({
      from: req.user._id,
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
      message: err.message || "Failure to Create the Data!",
    });
  }
};

exports.GetConversationsList = async (req, res) => {
  try {
    let from = mongoose.Types.ObjectId(req.user._id);
    let data = await Conversation.find({
      recipients: {
        $all: [{ $elemMatch: { $eq: from } }],
      },
    }).populate("recipients", "-password");

    res.status(200).json({
      success: true,
      message: "Successfully get the conversations!",
      data,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message || "Failure to Get the Data!",
    });
  }
};

exports.GetMessagesFromConversation = async (req, res) => {
  try {
    let user1 = mongoose.Types.ObjectId(req.user._id);
    let user2 = req.query.userId;

    let data = await Message.find({
      $or: [
        { $and: [{ to: user1 }, { from: user2 }] },
        { $and: [{ to: user2 }, { from: user1 }] },
      ],
    })
      .populate("from", "name username")
      .populate("to", "name username");

    res.status(200).json({
      success: true,
      message: "Successfully get messages from conversation!",
      data,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message || "Failure to Get the Data!",
    });
  }
};

exports.CreatePrivateMessage = async (req, res) => {
  try {
    let from = mongoose.Types.ObjectId(req.user._id);
    let to = req.body.to;

    let conversation = await Conversation.findOneAndUpdate(
      {
        recipients: {
          $all: [{ $elemMatch: { $eq: from } }, { $elemMatch: { $eq: to } }],
        },
      },
      {
        recipients: [req.user._id, to],
        lastMessage: req.body.body,
        date: Date.now(),
      },
      {
        upsert: true,
        new: true,
        setDefaultsOnInsert: true,
      }
    );

    await Message.create({
      conversation: conversation._id,
      to: to,
      from: req.user._id,
      body: req.body.body,
    });

    req.io.sockets.emit("messages", req.body.body);

    res.status(200).json({
      success: true,
      message: "Successfully creating a private message!",
      conversationId: conversation._id,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message || "Failure to Create the Message!",
    });
  }
};
