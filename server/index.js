const express = require("express");
const app = express();
require("dotenv").config();
const path = require("path");
const io = require("socket.io")(app);

const uri = process.env.MONGODB_URI;
const port = process.env.PORT || 5000;
