const { User } = require("../models/UserModel");
const c = require("config");

class ProfileRouter{
    async get_user(req, res){
        if( !Number.isInteger(parseInt(req.params.id))){
            return res.send("Введен неправильный ID");
        }
        const user = await User.findOne({
            where:{
                ID: parseInt(req.params.id)
            }
        })
        if(!user || JSON.stringify(user) == "{}"){
            return res.send("Пользователь не найден");
        }
        res.send(user);

    }
    async edit_user(req, res){
        res.send(req.user_ID);
        console.log(req.url);
    }
    async get_profile(req, res){
        try{
            const user = await User.findOne({
                where:{
                    ID: req.user_ID
                }
            });
            res.send(user);
        }catch(error){
            console.log(error);
            return res.send("Ошибка при авторизации");
        }
    }
}
module.exports = new ProfileRouter();