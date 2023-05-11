"use strict"


const port = 3000,
    express = require("express"),
    app = express(),
    layouts = require("express-ejs-layouts"),
    homeController = require("./controllers/homeController"),
    profileController = require("./controllers/profileController"),
    loginController = require("./controllers/loginController"),
    registerController = require("./controllers/registerController"),
    productController = require("./controllers/productController"),
    expressEjsLayouts = require("express-ejs-layouts");



app.set("view engine", "ejs");

app.use(
    express.urlencoded({
        extended: false
    }),
    express.json(),
    expressEjsLayouts
);

app.use(homeController.logRequestData);

//to serve up static files in "public" folder
app.use('/public', express.static('public'));

//http://localhost:3000/?user=name
//optional query parameter for username
//depending on wether or not a user is logged in
app.get("/", homeController.sendHomePage);

//http://localhost:3000/login
app.get("/login", loginController.sendLoginPage);
app.post("/login", loginController.loginPost);

app.get("/register", registerController.sendRegisterPage);
app.get("/createProduct", productController.sendUploadProductPage);

//http://localhost:3000/profile/name
//url parameter for username
//TODO: change url param into query param ??
app.get("/profile/:user", profileController.sendProfilePage);


//Capturing posted data from the request body in main.js
app.post("/", homeController.homePost);

app.listen(port, () => {
    console.log(`The Express.js server has started and is listening on port number: ${port}`);
});
