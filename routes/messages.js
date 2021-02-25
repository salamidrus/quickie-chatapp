const express = require("express");
const router = express.Router();
const passport = require("passport");
const messageControllers = require("../controllers.js/messages");

router.get(
  "/global",
  passport.authenticate("jwt", { session: false }),
  messageControllers.GetAllGlobalMessages
);

router.post(
  "/global",
  passport.authenticate("jwt", { session: false }),
  messageControllers.CreateGlobalMessage
);

router.get(
  "/conversations",
  passport.authenticate("jwt", { session: false }),
  messageControllers.GetConversationsList
);

router.get(
  "/conversations/query",
  passport.authenticate("jwt", { session: false }),
  messageControllers.GetMessagesFromConversation
);

router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  messageControllers.CreatePrivateMessage
);

module.exports = router;
