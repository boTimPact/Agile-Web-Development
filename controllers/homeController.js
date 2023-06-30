"use strict";
const { serialize } = require("mongodb");
const Product = require("../models/product");

module.exports = {
  sendHomePage: (req, res) => {
    let searchString = (req.query.search) ? req.query.search : ""
    let cat = (req.query.cat) ? req.query.cat : ""

    let searchTitle = { title: { "$regex": searchString, "$options": "i" } }
    let searchDescription = { description: { "$regex": searchString, "$options": "i" } }
    const query = { $or: [searchTitle, searchDescription] }
    if (cat != null && cat != "") { query.category = cat }
    Product.find(query)
      .limit(10) //returns max 10 products
      .exec()
      .then((products) => {
        console.log(products)
        if (req.cookies.username != null && req.cookies.username != undefined) {
          let user = {
            username: req.cookies.username,
            profilePicture: "../public/images/profile.PNG", // This should be the actual path to the user's profile picture
          };
          let viewParameter = { loggedIn: true, user: user, page: "Home", productList: products, search: searchString, cat: cat }
          res.render("index.ejs", viewParameter)
        } else {
          let viewParameter = { loggedIn: false, page: "Home", productList: products, search: searchString, cat: cat }
          res.render("index.ejs", viewParameter)
        }
      })
      .catch((error) => { console.log(error.message); })
  },

  search: (req, res) => {
    let searchString = req.body.search //input from searchbar
    let cat = (req.query.cat) ? req.query.cat : ""
    res.redirect("/?search=" + searchString.trim() + "&cat=" + cat);
  },

  logRequestData: (req, res, next) => {
    console.log("\n");
    console.log(req.url);
    console.log(req.body);
    console.log(req.params);
    console.log(req.query);
    next();
  }
}