const {check} = require("express-validator");
const Router = require("express");
const router = new Router();
const bc = require("bcrypt");
const c = require("config");

const controller = require("../controllers/UserController");
const { User } = require("../models/UserModel");
const { sequelize } = require("../controllers/DbController");

router.post("/register", async (req, res)=>{
    const user = await User.findOne({
        Email: req.body.Email
    });

    if(user){
        res.send(`Пользователь с заданным Email уже существует: ${req.body.Email}`);
    }
    else{
        
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
    }   
});
// router.post("/login", controller.login);
router.get("/all", async (req, res)=>{
    
    res.send(await User.findAll());
});

module.exports = router;