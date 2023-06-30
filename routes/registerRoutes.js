const router = require("express").Router(),
    registerController = require("../controllers/registerController");
const validator = require("../middleware/validateRequest"),
    validateUser = validator.validateUser,
    handleErrors = validator.handleErrors;

router.get("/", registerController.sendRegisterPage);
router.post("/", validateUser, handleErrors, registerController.create);

module.exports = router;