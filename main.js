"use strict"


const port = 3000,
    express = require("express"),
    app = express(),
    homeController = require("./controllers/homeController"),
    profileController = require("./controllers/profileController"),
    loginController = require("./controllers/loginController"),
    registerController = require("./controllers/registerController"),
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


app.get("/", homeController.sendHomePage);

app.get("/login", loginController.sendLoginPage);

app.get("/register", registerController.sendRegisterPage);

//parameter -> localhost:3000/profile
app.get("/:profile", profileController.sendProfilePage);


//Capturing posted data from the request body in main.js
app.post("/", homeController.homePost);

app.listen(port, () => {
    console.log(`The Express.js server has started and is listening on port number: ${port}`);
});
