"use strict"

const port = 3000,
    express = require("express"),
    app = express(),
    layouts = require("express-ejs-layouts"),
    homeController = require("./controllers/homeController"),
    profileController = require("./controllers/profileController"),
    loginController = require("./controllers/loginController"),
    registerController = require("./controllers/registerController");



app.set("view engine", "ejs");

app.use(
    express.urlencoded({
        extended: false
    }),
    express.json(),
    layouts
);

app.use(homeController.logRequestData);

//to serve up static files in "public" folder
app.use('/public', express.static('public'));

app.get("/", homeController.sendHomePage);

app.get("/login", loginController.sendLoginPage);

app.get("/register", registerController.sendRegisterPage);

//parameter -> localhost:3000/profile
app.get("/profile/:name", profileController.sendProfilePage);


//Capturing posted data from the request body in main.js
app.post("/", homeController.homePost);

app.listen(port, () => {
    console.log(`The Express.js server has started and is listening on port number: ${port}`);
});
