"use strict"

const port= 3000,
express = require("express"),
app = express();

app.get("/", (req, res) => {
    res.send("hallo");
    console.log(req.params); 
    console.log(req.body); 
    console.log(req.url); 
    console.log(req.query);
})
//parameter -> localhost:3000/profile
app.get("/:profile", (req, res) => {
    let profile = req.params.profile;
    res.send(`This is the page for your`+ profile);
})

app.use (
    express.urlencoded({
        extended: false
    })
);
app.use(express.json());

//Capturing posted data from the request body in main.js
app.post("/", (req, res) => {
    console.log(req.body);
    console.log(req.query); //to see query strings on server
    res.send("POST Successful!");
})

.listen(port, () => {
    console.log('The Express.js server has started and is listening on port number:' + port);

});
