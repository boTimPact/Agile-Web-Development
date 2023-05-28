"use strict";
const Product = require("../models/product");

exports.sendHomePage = (req, res) => {
  Product.find({})
    .exec()
    .then((products) => {
      console.log(products)
      if (req.query.user != null && req.query.user != undefined) {
        let user = {
          username: req.query.user,
          profilePicture: "../public/images/profile.PNG", // This should be the actual path to the user's profile picture
        };
        let viewParameter = { loggedIn: true, user: user, page: "Home", productList: products }
        res.render("index.ejs", viewParameter)
      } else {
        let viewParameter = { loggedIn: false, page: "Home", productList: products }
        res.render("index.ejs", viewParameter)
      }
    })
    .catch((error) => { console.log(error.message); })
}

exports.homePost = (req, res) => {
  res.send("POST Successful!");
};

exports.logRequestData = (req, res, next) => {
  console.log("\n");
  console.log(req.url);
  console.log(req.body);
  console.log(req.params);
  console.log(req.query);
  next();
};

