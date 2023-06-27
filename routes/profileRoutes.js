const router = require("express").Router(),
    profileController = require("../controllers/profileController");

const validator = require("../middleware/validateRequest"),
    validateUser = validator.validateUser,
    handleErrors = validator.handleErrors;

router.get("/", profileController.sendProfilePage);
router.get("/delete", profileController.deleteUser);
router.get("/update", profileController.getEditProfileForm);
router.put("/update", validateUser, handleErrors, profileController.updateProfile);

module.exports = router;