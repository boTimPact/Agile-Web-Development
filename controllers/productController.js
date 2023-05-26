"use strict"

exports.sendUploadProductPage = (req, res) => {
    res.render("uploadProduct.ejs", {page : "Upload Produkt"});
}