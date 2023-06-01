const mongoose = require("mongoose"),
        productSchema = mongoose.Schema({
                product_id: String,
                user_id: String,
                title: {
                        type: String,
                        required: true
                },
                description: String,
                category: String,
                size: String,
                offer_type: {
                        type: String,
                        required: true
                }
        });
module.exports = mongoose.model("Product", productSchema);
