const {check} = require("express-validator");
const {pool} = require("../controllers/db");
const router = require("express").Router;

const controller = require("../controllers/UserController");

router.post("/register", controller.register);
router.post("/login", controller.login);

module.exports = router;