const Router = require("express");
const router = new Router();
const valid = require("express-validator");

const { User } = require("../models/UserModel");
const UserController = require("../controllers/UserController");
const ValidateMiddleware = require("../middleware/ValidateMiddleware");

// Регистрация
router.post("/register", 
    valid.body(["Name", "Surname", "Email", "Pass"], "Поля не должны быть пустые").notEmpty(),
    valid.body(["Name", "Surname"], "Пожалуйста, проверьте Имя и Фамилию").matches(/^[А-Яа-я\\s]+$/),
    valid.body("Email", "Введите корректный Email").isEmail(),
    valid.body("Pass", "Минимальная длина пароля - 6 символов").isLength({min:6}),
    ValidateMiddleware,UserController.register);

// Логин
router.post("/login", UserController.login);

module.exports = router;