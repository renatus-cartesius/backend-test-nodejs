const bc = require("bcrypt");
const { User } = require("../models/UserModel");
const c = require("config");
const jwt = require("jsonwebtoken");

const genToken = (id) => {
    const payload = {
        id
    }
    return jwt.sign(payload, c.get("JWT").Secret, {expiresIn: "48h"});
}

class UserController{
    async register(req, res){
        const user = await User.findOne({
            where:{
                Email: req.body.Email
            }
        });
    
        if(user){
            res.send(`Пользователь с заданным Email уже существует: ${user.Email}`);
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
                res.send(error);
            } 
        }   
    }
    async login(req, res){
        console.log(req.body);
        try {
            const user = await User.findOne({
                where:{
                    Email: req.body.Email
                }
            });
            const truePass = bc.compareSync(req.body.Pass, user.Pass);
            if(!truePass || !user){
                return res.send("Введен неверный email или пароль");
            }
            const token = genToken(user.id);
            return res.json({token});
        } catch (error) {
            console.log(error);
            res.send("Ошибка при авторизации");
        }
    }
}

module.exports = new UserController();