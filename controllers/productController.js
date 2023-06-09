"use strict"

const product = require("../models/product");
const Product = require("../models/product");
const User = require("../models/user");


//http://localhost:3000/createProduct/?user=Pia
exports.newProductPost = (req, res) => {
    var user;

    User.findOne({ username: req.query.user })
        .exec()
        .then((resDB) => {
            user = resDB;
        })
        .then(() => {
            //aconsole.log(user.id)
            let newProduct = new Product({
                user: user._id,
                title: req.body.title,
                description: req.body.description,
                category: req.body.categories,
                size: req.body.size,
                offer_type: req.body.trade
            });
            return newProduct;
        })
        .then((product) => {
            product.save();
            return product;
        })
        .then(() => {
            console.log("Success!")
            res.redirect("/?user=" + user.username);
        })
        .catch((err) => { console.log(err) })
}

exports.sendUploadProductPage = (req, res) => {
    let user = {
        username: req.query.user,
        profilePicture: "../public/images/profile.PNG", // This should be the actual path to the user's profile picture
    };
    res.render("uploadProduct.ejs", { loggedIn: true, user: user, page: "Upload Produkt" });
}

//http://localhost:3000/product/646e21237dd2f2540d9f03aa
exports.getProductPage = (req, res) => {
    console.log(req.params.product_id);

    Product.findOne({ _id: req.params.product_id })
        .populate('user')
        .exec()
        .then((product) => {
            if (req.query.user != null && req.query.user != undefined) {
                let user = {
                    username: req.query.user,
                    profilePicture: "../public/images/profile.PNG", // This should be the actual path to the user's profile picture
                };
                res.render("product.ejs", { loggedIn: true, product: product, page: `Product: ${product.title}`, user: user });
            }
            else {
                res.render("product.ejs", { loggedIn: false, product: product, page: `Product: ${product.title}` });
            }
        })
        .catch((err) => {
            console.log(err);
        });
}


//http://localhost:3000/product/646e21237dd2f2540d9f03aa/edit
exports.getEditProductForm = (req, res) => {
    let user = {
        username: req.query.user,
        profilePicture: "../public/images/profile.PNG", // This should be the actual path to the user's profile picture
    };
    res.render("uploadProduct.ejs", { loggedIn: true, user: user, page: "Upload Produkt" });
}