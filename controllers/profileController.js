"use strict";
const User = require("../models/user");
const Product = require("../models/product");

exports.sendProfilePage = (req, res) => {
    if (req.query.user != null && req.query.user != undefined) {
        let query = User.findOne({ username: req.query.user })
        query.exec()
            .then((userData) => {
                if (userData != null) {
                    userData.passwordComparison (req.body.password)
                        .then(passwordMatch => {
                            if (passwordMatch) {
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
                            } else {
                                res.locals.redirect = "/login";
                            }
                            next();
                        });
                } else {
                    //something went wrong
                    res.locals.redirect = "/login";
					next();
                }
            })
            .catch((err) => {                                     
                console.log(err);
                next(err);
            })
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

exports.getEditProfileForm = (req, res) => {
    
    let query = User.findOne({ username: req.query.user })
        query.exec()
        .then((userData) => {
            if (userData != null) {
                console.log(userData)
                userData.profilePicture = "../public/images/profile.PNG"

                let viewParameter = {
                    loggedIn: true,
                    user: userData,
                    page: "Profile"
                }
                res.render("updateProfile.ejs", viewParameter);
            } else {
                console.log("something went wrong");
                res.redirect("./")
            }
        })
        .catch((err) => { console.log(err) });
}


exports.updateProfile = (req, res) => {
    //get form data
    let userParams = {
        username: req.body.username,
        email: req.body.email,
        address: req.body.address
    }
    console.log("User: " + req.query.user);

    User.findOne({username: req.query.user})
    .exec()
    .then(user => {
        //update data in db
        User.findByIdAndUpdate(user._id, { $set: userParams })
        .then(newUser => {
            console.log("Username: " + newUser.username);
            console.log("user updated");
            res.redirect("/profile?user=" + userParams.username);
        })
        .catch(err => {
            console.log("Error updating User")
            console.log(err.message)
            next(err)
        });
    })
    .catch(err => {
        console.log(err.message)
        next(err)
    });
}
