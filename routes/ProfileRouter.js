const {check} = require("express-validator");
const Router = require("express");
const ProfileController = require("../controllers/ProfileController");
const ProfileMiddleware = require("../middleware/ProfileMiddleware");
const router = new Router();

router.put("/:id", ProfileMiddleware ,ProfileController.getID);

module.exports = router;