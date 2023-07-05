const router = require("express").Router(),
    productRoutes = require("./productRoutes"),
    registerController = require("../../controllers/registerController");

router.use(registerController.verifyToken)
router.use("/product", productRoutes);

module.exports = router;