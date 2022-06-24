const { User } = require("../models/UserModel");
const c = require("config");

class ProfileRouter{

    async get_user(req, res){
        if( !Number.isInteger(parseInt(req.params.id))){
            return res.send({message: "Введен неправильный ID"} );
        }
        const user = await User.findOne({
            where:{
                ID: parseInt(req.params.id)
            }
        })
        if(!user || JSON.stringify(user) == "{}"){
            return res.send({message: "Пользователь не найден"});
        }
        res.send(user);

    }

    async edit_user(req, res){
        if(req.body.Sex != "Мужской"){
            if(req.body.Sex != "Женский"){
                return res.send({message: "Пол может быть только 'Мужской' или 'Женский' "});
            }
        }
        try {
            const user = await User.findOne({
                where:{
                    ID: req.user_ID
                }
            });
            
            user.Name = req.body.Name;
            user.Surname = req.body.Surname;
            user.Email = req.body.Email;
            user.Photo = req.body.Photo;
            user.Sex = req.body.Sex;
            user.Phone = req.body.Phone;

            const edit_result = await user.save();
            res.send(edit_result);
        } catch (error) {
            console.log(error);
            res.send({message: "Ошибка при редактировании"})
        }
    }

    async get_profile(req, res){
        try{
            const user = await User.findOne({
                where:{
                    ID: req.user_ID
                }
            });
            res.send(user);
            console.log(req.user_ID);
        }catch(error){
            console.log(error);
            return res.send({message: "Ошибка при авторизации"} );
        }
    }

    async get_all_users(req, res){
        try {
            const users = await User.findAll();
            const usersPerPage = c.get("Paging").Count;
            
            res.json({
                usersPerPage,
                usersCount: users.length,
                pageNumber: parseInt(req.query.page),
                users: users.slice(usersPerPage*(req.query.page - 1), req.query.page*usersPerPage).sort((prev, next)=>{ // Сортировка по времени создания
                    return new Date(prev.Creation_time) - new Date(next.Creation_time);
                })
            });
        } catch (error) {
            console.log(error);
            res.send({message: "Ошибка при получении пользователей"});
        }
    }
}
module.exports = new ProfileRouter();