const Router = require("express");
const router = new Router();

const { User } = require("../models/UserModel");
const UserController = require("../controllers/UserController");

// Регистрация
router.post("/register", UserController.register);

// Логин
router.post("/login", UserController.login);

module.exports = router;