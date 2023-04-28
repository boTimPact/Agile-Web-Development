"use strict"

exports.sendHomePage = (req, res) => {
    res.send("hallo");
}

exports.homePost = (req, res) => {
    res.send("POST Successful!");
}