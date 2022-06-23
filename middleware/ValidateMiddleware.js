const valid = require("express-validator");
const { User } = require("../models/UserModel");


module.exports = async function(req, res, next){
    const user = await User.findOne({
        where:{
            Email: req.body.Email
        }
    });
    if(user && req.user_ID != user.ID){
        return res.status(400).json({message: "Данный email существует, введите другой"});
    }

    const errors = valid.validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({message: "Введены неккоретные данные:", error: valid.validationResult(req).errors});
    }
    else{
        next();
    }
}