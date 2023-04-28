"use strict"

exports.sendHomePage = (req, res) => {
    res.send("hallo");
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