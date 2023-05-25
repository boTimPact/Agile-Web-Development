"use strict"
const Product = require("../models/product");

exports.sendUploadProductPage = (req, res) => {
    res.render("uploadProduct.ejs", {page : "Upload Produkt"});
}
exports.getAllProducts = (req, res) => {
    let query = Product.find({})
    query
            .exec()
            .then((product) => {    
                console.log(product);
                res.send(product);
                /*res.render("index", {
                    productArray: products     //kommt nicht bei index an..... 
                });*/
            })
            .catch((error) => {
                console.log(error.message);
                return [];
            })
            .then(() => {
                console.log("promise complete");
            })
  
}