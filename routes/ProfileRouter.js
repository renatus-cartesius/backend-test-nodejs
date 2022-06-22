const {check} = require("express-validator");
const Router = require("express");
const ProfileController = require("../controllers/ProfileController");
const LoginMiddleware = require("../middleware/LoginMiddleware");
const router = new Router();

router.put("/:id", LoginMiddleware ,ProfileController.getID);

module.exports = router;