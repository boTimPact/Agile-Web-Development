"use strict"

exports.sendHomePage = (req, res) => {
    if (req.params.user != null && req.params.user != undefined) {
        let model = { loggedIn: true, username: req.params.user }
        res.render("index.ejs", model)
    } else {
        let model = { loggedIn: false }
        res.render("index.ejs", model)
    }

}

exports.homePost = (req, res) => {
    res.send("POST Successful!");
}

exports.logRequestData = (req, res, next) => {
    console.log("\n");
    console.log(req.url);
    console.log(req.body);
    console.log(req.params);
    console.log(req.query);
    next();
}