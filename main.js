"use strict"

const port= 3000,
express = require("express"),
app = express(),
homeController = require("./controllers/homeController");

app.use(
    express.urlencoded({
        extended: false
    }),
    express.json()
);

app.use((req, res, next) => {
    console.log("\n");
    console.log(req.url);
    console.log(req.body);
    console.log(req.params);
    console.log(req.query);
    next();
});


app.get("/", homeController.sendHomePage);


//parameter -> localhost:3000/profile
app.get("/:profile", (req, res) => {
    let profile = req.params.profile;
    res.send(`This is the page for your`+ profile);
});


//Capturing posted data from the request body in main.js
app.post("/", homeController.homePost);

app.listen(port, () => {
    console.log('The Express.js server has started and is listening on port number:' + port);

});
