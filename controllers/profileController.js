"use strict";

exports.sendProfilePage = (req, res) => {
    let model = { username: req.params.user, page: "Profile" }
    res.render("profile.ejs", model);
}