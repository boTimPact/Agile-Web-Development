"use strict"

exports.sendHomePage = (req, res) => {
    if (req.query.user != null && req.query.user != undefined) {
        let viewParameter = { loggedIn: true, username: req.query.user, page: "Home" }
        res.render("index.ejs", viewParameter)
    } else {
        let viewParameter = { loggedIn: false, page: "Home" }
        res.render("index.ejs", viewParameter)
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