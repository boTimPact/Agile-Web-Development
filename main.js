"use strict";

const port = 3000,
  express = require("express"),
  router = require("./routes/index"),
  passport = require("passport"),
  mongoose = require("mongoose"),
  expressEjsLayouts = require("express-ejs-layouts"),
  methodOverride = require("method-override"),
  expressSession = require("express-session"),
  cookieParser = require("cookie-parser"),
  connectFlash = require("connect-flash"),
  app = express();

  
  const dbUsername = 'Admin';
  const dbPassword = 'TestPassword276380';
  const dbName = 'swappyDB';
  
  // MongoDB connection options
  const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  user: dbUsername,
  pass: dbPassword,
  dbName: dbName,
  };

mongoose.connect("mongodb://192.168.178.33:27017", options); //91.58.14.60
//mongoose.connect("mongodb://localhost:27017/swappyDB", { useNewUrlParser: true });

app.set("view engine", "ejs");
//to serve up static files in "public" folder
app.use("/public", express.static("public"));

mongoose.Promise = global.Promise

app.use(
  express.urlencoded({
    extended: false,
  }),
  express.json(),
  expressEjsLayouts,
);

app.use(cookieParser("secret_passcode"))
app.use(expressSession({
  secret: "swappy_secret",
  cookie: {
    maxAge: 4000000
  },
  resave: false,
  saveUninitialized: false
}))
app.use(connectFlash())
app.use((req, res, next) => {
  res.locals.flashMessages = req.flash();
  next();
});

app.use(methodOverride("_method", {
  methods: ["POST", "GET"]
}));

app.use(passport.initialize());
app.use(passport.session());
const User = require("./models/user");
passport.use(User.createStrategy());
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use("/", router);

app.listen(port, () => {
  console.log(
    `The Express.js server has started and is listening on port number: ${port}`
  );
});
