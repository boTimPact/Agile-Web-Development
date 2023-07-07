const router = require("express").Router(),
    productRoutes = require("./productRoutes"),
    registerController = require("../../controllers/registerController"),
    loginController = require("../../controllers/loginController");

router.post("/login", loginController.apiAuthenticate);

//router.use(registerController.verifyToken)
router.use("/product", productRoutes);
router.use(loginController.verifyJWT);

module.exports = router;