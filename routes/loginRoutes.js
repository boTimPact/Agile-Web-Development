const router = require("express").Router(),
    loginController = require("../controllers/loginController");

//http://localhost:3000/login
router.get("/", loginController.sendLoginPage);
router.post("/", loginController.authenticate);
router.get("/success", loginController.loginSuccess)

//logouzt route sollte geändert werden, gerade: http://localhost:3000/login/logout 
router.get("/logout", loginController.logout);

module.exports = router;