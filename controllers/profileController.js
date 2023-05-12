"use strict";

exports.sendProfilePage = (req, res) => {
    let viewParameter = { username: req.params.user, page: "Profile" }
    res.render("profile.ejs", viewParameter);
}