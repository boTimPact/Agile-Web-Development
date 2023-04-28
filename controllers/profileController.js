"use strict";

exports.sendProfilePage = (req, res) => {
    let profile = req.params.profile;
    res.send(`This is the page for your ${profile}`);
}