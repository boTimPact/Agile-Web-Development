"use strict";
const User = require("../models/user");
const Product = require("../models/product");
const user = require("../models/user");

exports.sendProfilePage = (req, res) => {
    if (req.query.user != null && req.query.user != undefined) {
        let query = User.findOne({ username: req.query.user })
        query.exec()
            .then((userData) => {
                if (userData != null) {
                    //console.log(userData)
                    userData.profilePicture = "../public/images/profile.PNG"

                    Product.find({ user: userData._id })
                        .exec()
                        .then((DBProducts) => {
                            let products = []
                            //console.log(DBProducts)
                            DBProducts.forEach(p => {
                                products.push(p)
                            });

                            let viewParameter = {
                                loggedIn: true,
                                user: userData,
                                page: "Profile",
                                products: products
                            }
                            res.render("profile.ejs", viewParameter);
                        })
                        .catch((err) => { console.log(err) })
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

exports.deleteUser = (req, res) => {
    User.findOneAndDelete({ username: req.query.user })
        .exec()
        .then(() => {
            res.redirect("/");
        })
        .catch(error => {
            console.log(`Error deleting user by ID: ${error.message}`);
            next(error);
        });
}
