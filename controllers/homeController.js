"use strict"

exports.sendHomePage = (req, res) => {
    if (req.query.user != null && req.query.user != undefined) {
        let model = { loggedIn: true, username: req.query.user }
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