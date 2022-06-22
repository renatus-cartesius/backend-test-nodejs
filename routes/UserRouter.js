const {check} = require("express-validator");
const Router = require("express");
const router = new Router();
const bc = require("bcrypt");
const c = require("config");

const controller = require("../controllers/UserController");
const { User } = require("../models/UserModel");

router.post("/register", (req, res)=>{
    try {
        const result = User.findAll();
        res.send(result.toString());
    } catch (error) {
        console.log(error);
        res.send("ERROR:", error);
    }
    
    try {
        User.create(
            {
                Name: req.body.Name,
                Surname: req.body.Surname,
                Email: req.body.Email,
                Pass: bc.hashSync(req.body.Pass, c.get("Bcrypt").SaltRounds).toString()
            }
        );
        res.send("OK");
    } catch (error) {
        console.log(error);
        res.send("ERROR:", error);
    }    
});
// router.post("/login", controller.login);



module.exports = router;