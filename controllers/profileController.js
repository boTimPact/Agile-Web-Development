"use strict";
const User = require("../models/user");

exports.sendProfilePage = (req, res) => {
    if (req.query.user != null && req.query.user != undefined) {
        let query = User.findOne({ username: req.query.user })
        query.exec()
            .then((userData) => {
                if (userData != null) {
                    console.log(userData)
                    let viewParameter = { loggedIn: true, user: userData, page: "Profile" }
                    res.render("profile.ejs", viewParameter);
                } else {
                    //something went wrong
                    res.redirect("./")
                }
            })
            .catch((err) => { console.log(err) })
    } else {
        //no user logged in
        res.redirect("/login")
    }

}