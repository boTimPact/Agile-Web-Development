const router = require("express").Router(),
    profileRoutes = require("./profileRoutes"),
    productRoutes = require("./productRoutes"),
    loginRoutes = require("./loginRoutes"),
    registerRoutes = require("./registerRoutes"),
    errorRoutes = require("./errorRoutes"),
    homeRoutes = require("./homeRoutes");

router.use("/profile", profileRoutes);
router.use("/product", productRoutes);
router.use("/login", loginRoutes);
router.use("/register", registerRoutes);

router.use("/", homeRoutes);
router.use("/", errorRoutes);

module.exports = router;