const valid = require("express-validator");
const Router = require("express");
const ProfileController = require("../controllers/ProfileController");
const ProfileMiddleware = require("../middleware/ProfileMiddleware");
const router = new Router();
const ValidateMiddleware = require("../middleware/ValidateMiddleware");


// Немного изменил URL для запросов get-set пользователя по ID, чтобы добавить возможность просмотра пользователя по JWT-токену
router.get("/get/:id", ProfileMiddleware, ProfileController.get_user);
router.put("/set/:id", 
    valid.body(["Name", "Surname", "Photo", "Phone", "Email"], "Поля не должны быть пустые").notEmpty(), ProfileMiddleware,
    valid.body(["Name", "Surname"], "Пожалуйста, проверьте Имя и Фамилию").matches(/^[А-Яа-я\\s]+$/),
    valid.body("Email", "Введите корректный Email").isEmail(),
    valid.body("Phone", "Введен неккоректный телефон").isMobilePhone(),
    ValidateMiddleware,  ProfileController.edit_user
);

router.post("/set_photo", ProfileMiddleware, ProfileController.set_photo);

// Маршрут для тестирования функционала просмотра по JWT-токену
router.get("/my", ProfileMiddleware, ProfileController.get_profile);

module.exports = router;