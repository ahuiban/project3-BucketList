require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const app = express();
const PORT = process.env.PORT || 3003;
const cors = require("cors");
const session = require("express-session");

app.use(cors());
app.use(express.json());
app.use(
  session({
    secret: "proj3forhire", //some random string
    resave: false,
    saveUninitialized: false
  })
);

//required controllers
const bucketListController = require("./controllers/bucketLists.js");
app.use("/bucketlists", bucketListController);

const usersController = require("./controllers/users.js");
app.use("/users", usersController);

const sessionsController = require("./controllers/sessions.js");
app.use("/sessions", sessionsController);

const itemsController = require('./controllers/listItems.js');
app.use('/listitems', itemsController);

//MONGOOSE
const MONGODB_URI = process.env.MONGODB_URI || "heroku link goes here";

mongoose.connection.on("error", err =>
  console.log(err.message + " is Mongod not running?")
);
mongoose.connection.on("disconnected", () => console.log("mongo disconnected"));

mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true });
mongoose.connection.once("open", () => {
  console.log("connected to mongoose...");
});

//Redirect
app.get("/", (req, res) => {
  if (req.session.currentUser) {
    res.redirect("/bucketlists");
  } else {
    res.redirect("/sessions/new");
  }
});

app.listen(PORT, () => {
  console.log("listening on port", PORT);
});
