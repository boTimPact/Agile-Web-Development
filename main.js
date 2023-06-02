"use strict";

const port = 3000,
  express = require("express"),
  app = express(),
  layouts = require("express-ejs-layouts"),
  homeController = require("./controllers/homeController"),
  profileController = require("./controllers/profileController"),
  loginController = require("./controllers/loginController"),
  registerController = require("./controllers/registerController"),
  productController = require("./controllers/productController"),
  errorController = require("./controllers/errorController"),
  mongoose = require("mongoose"),
  expressEjsLayouts = require("express-ejs-layouts");

//Database authentication needed
//mongoose.connect("mongodb://91.58.14.60:27017", options);
mongoose.connect("mongodb://localhost:27017/swappyDB", { useNewUrlParser: true });

app.set("view engine", "ejs");

mongoose.Promise = global.Promise

app.use(
  express.urlencoded({
    extended: false,
  }),
  express.json(),
  expressEjsLayouts
);

app.use(homeController.logRequestData);

//to serve up static files in "public" folder
app.use("/public", express.static("public"));

//http://localhost:3000/?user=name
//optional query parameter for username
//depending on wether or not a user is logged in
app.get("/", homeController.sendHomePage);

//http://localhost:3000/login
app.get("/login", loginController.sendLoginPage);
app.post("/login", loginController.loginPost);

app.get("/register", registerController.sendRegisterPage);
app.post("/register", registerController.signUpPost);

app.get("/createProduct", productController.sendUploadProductPage);
app.post("/createProduct", productController.newProductPost);

//http://localhost:3000/product/646e21237dd2f2540d9f03aa
app.get("/product/:product_id", productController.getProductPage);

//http://localhost:3000/profile?user=name
app.get("/profile", profileController.sendProfilePage);

//Capturing posted data from the request body in main.js
app.post("/", homeController.homePost);

//error logging
app.use(
  errorController.logErrors,
  errorController.respondInternalError,
  errorController.respondNoResourceFound
);

app.listen(port, () => {
  console.log(
    `The Express.js server has started and is listening on port number: ${port}`
  );
});
