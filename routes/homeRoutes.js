const router = require("express").Router(),
    homeController = require("../controllers/homeController");

router.use(homeController.logRequestData);
//http://localhost:3000
//optional query string for search
// /?search="bla"
router.get("/", homeController.sendHomePage);
router.post("/", homeController.search)
router.get("/chat/:profileID", homeController.chat) //query param for userID of chat partner

module.exports = router;