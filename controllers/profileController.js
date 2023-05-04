"use strict";

exports.sendProfilePage = (req, res) => {
    res.render("profile.ejs", { username: req.params.name });
}