"use strict";

const port = 3000,
  express = require("express"),
  router = express.Router(),
  passport = require("passport"),
  layouts = require("express-ejs-layouts"),
  homeController = require("./controllers/homeController"),
  profileController = require("./controllers/profileController"),
  loginController = require("./controllers/loginController"),
  registerController = require("./controllers/registerController"),
  productController = require("./controllers/productController"),
  errorController = require("./controllers/errorController"),
  mongoose = require("mongoose"),
  expressEjsLayouts = require("express-ejs-layouts"),
  methodOverride = require("method-override"),
  expressSession = require("express-session"),
  cookieParser = require("cookie-parser"),
  connectFlash = require("connect-flash"),
  validator = require("./middleware/validateRequest"),
  app = express();


const handleErrors = validator.handleErrors,
      validateUser = validator.validateUser,
      validateProduct = validator.validateProduct;

      
//mongoose.connect("mongodb://91.58.14.60:27017", options);
mongoose.connect("mongodb://localhost:27017/swappyDB", { useNewUrlParser: true });

app.set("view engine", "ejs");

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

app.use("/", router);

router.use(passport.initialize());
router.use(passport.session());
const User = require("./models/user");
passport.use(User.createStrategy());
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

router.use(homeController.logRequestData);

//to serve up static files in "public" folder
router.use("/public", express.static("public"));

//http://localhost:3000
//optional query parameter for username
//depending on wether or not a user is logged in
router.get("/", homeController.sendHomePage);

//http://localhost:3000/login
router.get("/login", loginController.sendLoginPage);
router.post("/login", loginController.authenticate);

router.get("/logout", loginController.logout);

router.get("/register", registerController.sendRegisterPage);
router.post("/register", validateUser, handleErrors, registerController.create);

router.get("/createProduct", productController.sendUploadProductPage);
router.post("/createProduct", validateProduct, handleErrors, productController.newProductPost);

//http://localhost:3000/product/646e21237dd2f2540d9f03aa
router.get("/product/:product_id", productController.getProductPage);

//http://localhost:3000/product/646e21237dd2f2540d9f03aa/edit
router.get("/product/:product_id/edit", productController.getEditProductForm);
//http://localhost:3000/product/64833822a3c654601d72823f/update?_method=PUT&user=username
router.put("/product/:product_id/update", validateProduct, handleErrors, productController.updateProduct);
router.get("/product/:product_id/delete", productController.deleteProduct);

//http://localhost:3000/profile?user=name
router.get("/profile", profileController.sendProfilePage);

//http://localhost:3000/profile/delete?user=username
router.get("/profile/delete", profileController.deleteUser);

router.get("/profile/update", profileController.getEditProfileForm);
router.put("/profile/update", validateUser, handleErrors, profileController.updateProfile);

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
