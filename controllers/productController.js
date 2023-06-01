"use strict"

const Product = require("../models/product");
const User = require("../models/user");

exports.sendUploadProductPage = (req, res) => {
    res.render("uploadProduct.ejs", { page: "Upload Produkt" });
}

//http://localhost:3000/createProduct/?user=Pia
exports.newProductPost = (req, res) => {
    let user = {
        username: req.query.user,
        id: undefined
    }

    let query = User.findOne({ username: user.username })
    query.exec()
        .then((resDB) => {
            console.log(resDB)
            user.id = resDB._id.toString()
        })
        .then(() => {
            console.log(user.id)
            let newProduct = new Product({
                user_id: user.id,
                title: req.body.title,
                description: req.body.description,
                category: req.body.categories,
                size: req.body.size,
                offer_type: req.body.trade
            });
            newProduct.save()
                .then(() => {
                    console.log("Success!")
                    res.redirect("/?user=" + user.username);
                })
                .catch((err) => { console.log(err) });
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
        .exec()
        .then((product) => {
            //console.log(product);
            let user = {
                username: req.query.user,
                profilePicture: "../public/images/profile.PNG", // This should be the actual path to the user's profile picture
            };
            res.render("product.ejs", { loggedIn: true, product: product, page: `Product: ${product.title}`, user: user });
        })
        .catch((err) => {
            console.log(err);
        });
}