const mongoose = require("mongoose"),
        productSchema = mongoose.Schema({

                user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
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
module.exports = mongoose.model('Product', productSchema);
