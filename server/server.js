const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const http = require("http");
const cookieParser = require("cookie-parser");
const socketio = require("socket.io");
// const passport = require("passport");
const users = require("./routes/api/users");
const adherent = require("./routes/api/Adherent");
const event = require("./routes/api/event");
const chat = require("./routes/api/router");
const app = express();
// const cors = require("cors");

// Bodyparser middleware
app.use(
  bodyParser.urlencoded({
    extended: false,
  })
);
app.use(bodyParser.json());
app.use(cookieParser());

// DB Config
const db = require("./config/keys").mongoURI;
// Connect to MongoDB
mongoose
  .connect(db, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB successfully connected"))
  .catch((err) => console.log(err));

// Passport middleware
// app.use(passport.initialize());
// Passport config
// require("./config/passport")(passport);
// Routes

const server = http.createServer(app);
const io = socketio(server);
io.on("connection", (soket) => {
  console.log("we have a new connection !!!");

  soket.on("disconnect", () => {
    console.log("user had left");
  });
});

app.use("/uploads", express.static("uploads"));
app.use("/api/users", users);
app.use("/api/adherent", adherent);
app.use("/api/event", event);
app.use("/api/chat", chat);

const port = process.env.PORT || 5000; // process.env.port is Heroku's port if you choose to deploy the app there
server.listen(port, () =>
  console.log(`Server up and running on port ${port} !`)
);
