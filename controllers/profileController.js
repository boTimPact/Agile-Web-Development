"use strict";

exports.sendProfilePage = (req, res) => {
    let model = { username: req.params.user }
    res.render("profile.ejs", model);
}