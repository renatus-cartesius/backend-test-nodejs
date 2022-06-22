const { User } = require("../models/UserModel");

class ProfileRouter{
    async getID(req, res){
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
}
module.exports = new ProfileRouter();