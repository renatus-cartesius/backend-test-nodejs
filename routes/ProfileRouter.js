const {check} = require("express-validator");
const Router = require("express");
const ProfileController = require("../controllers/ProfileController");
const ProfileMiddleware = require("../middleware/ProfileMiddleware");
const router = new Router();

// Немного изменил URL для запросов get-set пользователя по ID, чтобы добавить возможность просмотра пользователя по JWT-токену
router.get("/get/:id", ProfileMiddleware ,ProfileController.get_user);
router.put("/set/:id", ProfileMiddleware ,ProfileController.edit_user);
// Маршрут для тестирования функционала
router.get("/my", ProfileMiddleware, ProfileController.get_profile);

module.exports = router;