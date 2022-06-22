const {check} = require("express-validator");
const Router = require("express");
const ProfileController = require("../controllers/ProfileController");
const router = new Router();

router.put("/:id", ProfileController.getID);

module.exports = router;