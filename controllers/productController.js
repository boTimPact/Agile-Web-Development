"use strict";

const product = require("../models/product");
const Product = require("../models/product");
const User = require("../models/user");

module.exports = {
    //http://localhost:3000/product/createProduct
    newProductPost: (req, res) => {
        var user;

        User.findOne({ username: req.cookies.username })
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
                    category: req.body.category,
                    size: req.body.size,
                    offer_type: req.body.trade
                });
                return newProduct;
            })
            .then((product) => {
                product.save();
                return product;
            })
            .then((product) => {
                console.log("Success!")
                req.flash(
                    "success", `! ${product.title} successfully added !`
                );
                res.redirect("/");
            })
            .catch((err) => { console.log(err) })
    },

    sendUploadProductPage: (req, res) => {
        let user = {
            username: req.cookies.username,
            profilePicture: "../public/images/profile.PNG", // This should be the actual path to the user's profile picture
        };
        res.render("uploadProduct.ejs", { loggedIn: true, user: user, page: "Upload Produkt" });
    },

    productList: (req, res) => {
        console.log("getting ProductList");
        let productCountPerPage = 1,
        page = req.query.page;
        console.log("Page: " + page);

    
        Product.find()
        .limit(productCountPerPage)
        .skip(productCountPerPage * page)
        .sort({title: 'asc'})
        .exec()
        .then((products) => {
            res.json(products);
        })
        .catch((err) => { 
            console.log(err) 
        })
    },

    //http://localhost:3000/product/646e21237dd2f2540d9f03aa
    getProductPage: (req, res) => {
        console.log(req.params.product_id);

        Product.findOne({ _id: req.params.product_id })
            .populate('user')
            .exec()
            .then((product) => {
                if (req.cookies.username != null && req.cookies.username != undefined) {
                    let user = {
                        username: req.cookies.username,
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
    },


    //http://localhost:3000/product/646e21237dd2f2540d9f03aa/edit
    getEditProductForm: (req, res) => {
        let user = {
            username: req.cookies.username,
            profilePicture: "../public/images/profile.PNG", // This should be the actual path to the user's profile picture
        };
        Product.findOne({ _id: req.params.product_id })
            .populate('user')
            .exec()
            .then((product) => {
                console.log(product)
                res.render("updateProduct.ejs", { loggedIn: true, product: product, user: user, page: `Edit Produkt: ${product.title}` });
            })
            .catch((err) => {
                console.log(err);
            });
    },

    //http://localhost:3000/product/64833822a3c654601d72823f/update?_method=PUT
    updateProduct: (req, res) => {
        let product_id = req.params.product_id
        let user = {
            username: req.cookies.username,
            profilePicture: "../public/images/profile.PNG",
        };

        //get form data
        let productParams = {
            title: req.body.title,
            description: req.body.description,
            category: req.body.category,
            size: req.body.size,
            offer_type: req.body.trade
        }

        //update data in db
        Product.findByIdAndUpdate(product_id, { $set: productParams })
            .then(product => {
                req.flash(
                    "success", `! ${product.title} successfully updated !`
                );
                res.redirect("/product/" + product_id);
            })
            .catch(err => {
                console.log("Error updating Product")
                console.log(err.message)
                next(err)
            })
    },

    deleteProduct: (req, res) => {
        Product.findOneAndDelete({ _id: req.params.product_id })
            .exec()
            .then(() => {
                req.flash(
                    "success", `! successfully deleted product !`
                );
                res.redirect("/");
            })
            .catch((error) => {
                console.log(`Error deleting product: ${error.message}`);
                next(error);
            });
    }
}