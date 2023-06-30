const router = require("express").Router(),
    productRoutes = require("./productRoutes");


router.use("/product", productRoutes);

module.exports = router;