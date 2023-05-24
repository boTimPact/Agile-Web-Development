"use strict"

const product = require("../models/product");

exports.sendUploadProductPage = (req, res) => {
    res.render("uploadProduct.ejs", {page : "Upload Produkt"});
}

//http://localhost:3000/product/646e21237dd2f2540d9f03aa
exports.getProductPage = (req, res) => {
    console.log(req.params.product_id);

    product.findOne({_id: req.params.product_id})
    .exec()
    .then((product) => {
        //console.log(product);
        res.render("product.ejs", {product: product, page: `Product: ${product.title}`});
    })
    .catch((err) => {
        console.log(err);
    });
}
