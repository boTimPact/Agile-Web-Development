const router = require("express").Router(),
    errorController = require("../controllers/errorController");
    
router.use(
    errorController.logErrors,
    errorController.respondInternalError,
    errorController.respondNoResourceFound
)

module.exports = router;