"use strict";

const product = require("../models/product");
const Product = require("../models/product");
const User = require("../models/user");

//http://localhost:3000/createProduct/?user=Pia
exports.newProductPost = (req, res) => {
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
        .then((product) => {
            console.log("Success!")
            req.flash(
                "success", `! ${product.title} successfully added !`
            );
            res.redirect("/");
        })
        .catch((err) => { console.log(err) })
}

exports.sendUploadProductPage = (req, res) => {
    let user = {
        username: req.cookies.username,
        profilePicture: "../public/images/profile.PNG", // This should be the actual path to the user's profile picture
    };
    res.render("uploadProduct.ejs", { loggedIn: true, user: user, page: "Upload Produkt" });
}

//http://localhost:3000/product/646e21237dd2f2540d9f03aa?user=username
exports.getProductPage = (req, res) => {
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
}


//http://localhost:3000/product/646e21237dd2f2540d9f03aa/edit?user=username
exports.getEditProductForm = (req, res) => {
    let user = {
        username: req.cookies.username,
        profilePicture: "../public/images/profile.PNG", // This should be the actual path to the user's profile picture
    };
    Product.findOne({ _id: req.params.product_id })
        .populate('user')
        .exec()
        .then((product) => {
            console.log(product)
            res.render("editProduct.ejs", { loggedIn: true, product: product, user: user, page: `Edit Produkt: ${product.title}` });
        })
        .catch((err) => {
            console.log(err);
        });
}

//http://localhost:3000/product/64833822a3c654601d72823f/update?_method=PUT
exports.updateProduct = (req, res) => {
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
}
Product.findOne({ _id: req.params.product_id })
    .populate("user")
    .exec()
    .then((product) => {
        if (req.query.user != null && req.query.user != undefined) {
            let user = {
                username: req.query.user,
                profilePicture: "../public/images/profile.PNG", // This should be the actual path to the user's profile picture
            };
            res.render("product.ejs", {
                loggedIn: true,
                product: product,
                page: `Product: ${product.title}`,
                user: user,
            });
        } else {
            res.render("product.ejs", {
                loggedIn: false,
                product: product,
                page: `Product: ${product.title}`,
            });
        }
    })
    .catch((err) => {
        console.log(err);
    });

class ProductDeleter {
    constructor() { }

    async deleteProduct(userId, productId) {
        // check if user exists
        const user = await User.findById(userId);
        if (!user) {
            throw new Error("User not found");
        }

        // check if product exists and belongs to user
        const product = await Product.findOne({ _id: productId, user: userId });
        if (!product) {
            throw new Error(
                "Product not found or you are not the owner of the product"
            );
        }

        // delete the product
        await Product.deleteOne({ _id: productId });
        console.log("Product deleted successfully");
    }
}

const productDeleter = new ProductDeleter();

exports.deleteProduct = (req, res) => {
    const userId = req.body.user; // adjust according to your setup
    const productId = req.params.product_id; // adjust according to your setup

    productDeleter
        .deleteProduct(userId, productId)
        .then(() => {
            console.log("Product deleted successfully");
            res.status(200).send("Product deleted successfully");
        })
        .catch((err) => {
            console.error(err);
            res.status(500).send("Unable to delete the product");
        });
};
