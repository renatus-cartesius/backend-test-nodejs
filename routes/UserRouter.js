const {check} = require("express-validator");
const router = require("express").Router;

const controller = require("../controllers/UserController");

router.post("/register", (req, res)=>{
    
});
// router.post("/login", controller.login);



module.exports = router;