"use strict";
const User = require("../models/user");
const Product = require("../models/product");

exports.sendProfilePage = (req, res) => {
    if (req.query.user != null && req.query.user != undefined) {
        let query = User.findOne({ username: req.query.user })
        query.exec()
            .then((userData) => {
                if (userData != null) {
                    console.log(userData)
                    userData.profilePicture = "../public/images/profile.PNG"

                    let products = []

                    let viewParameter = {
                        loggedIn: true,
                        user: userData,
                        page: "Profile",
                        products: products
                    }
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