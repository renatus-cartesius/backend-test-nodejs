const bc = require("bcrypt");
const { User } = require("../models/UserModel");
const c = require("config");
const jwt = require("jsonwebtoken");

function genToken(ID){
    return jwt.sign({
        ID
    }, c.get("JWT").Secret, {expiresIn: "48h"});
}

class UserController{
    async register(req, res){
        const user = await User.findOne({
            where:{
                Email: req.body.Email
            }
        });
    
        if(user){
            res.send({message: `Пользователь с заданным Email уже существует: ${user.Email}`} );
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
                res.send({message: "Вы успешно зарегистрированы!"} );
            } catch (error) {
                console.log(error);
                res.send(error);
            } 
        }   
    }
    async login(req, res){
        try {
            const user = await User.findOne({
                where:{
                    Email: req.body.Email
                }
            });
            const truePass = bc.compareSync(req.body.Pass, user.Pass);
            if(!truePass || !user){
                return res.send({message: "Введен неверный email или пароль"});
            }
            const token = genToken(user.ID);
            return res.json({message:"Вы успешно вошли в аккаунт!", token});
        } catch (error) {
            console.log(error);
            res.send({message: "Ошибка при авторизации"});
        }
    }
}

module.exports = new UserController();