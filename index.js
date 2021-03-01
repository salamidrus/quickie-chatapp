const express = require("express");
const mongoose = require("mongoose");
const passport = require("passport");
const cors = require("cors");
require("dotenv").config();

const app = express();

const port = process.env.PORT || 5000;

const server = app.listen(port, () =>
  console.log(`Server running on port ${port}`)
);

const io = require("socket.io")(server, { serveClient: false });

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// CORS
app.use(cors());

// Database Configuration
const db = process.env.MONGODB_URI;

mongoose
  .connect(db, {
    useNewUrlParser: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB Successfully Connected!"))
  .catch((err) => console.log(err));

// Passport middleware
app.use(passport.initialize());
// Passport function
let passportMiddleware = require("./middleware/passport");
// Passport Config
passportMiddleware(passport);

// Assign socket object to every request
app.use((req, res, next) => {
  req.io = io;
  next();
});

// Routes
let userRoutes = require("./routes/users");
let messageRoutes = require("./routes/messages");

app.use("/api/users", userRoutes);
app.use("/api/messages", messageRoutes);