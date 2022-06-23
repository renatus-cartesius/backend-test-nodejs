const jwt = require("jsonwebtoken");
const c = require("config");

module.exports = function (req, res, next){
    if(req.method == "OPTIONS"){
        next();
    }
    try {
        const token = req.headers.authorization;
        if(!token){
            return res.send({message: "Вы не авторизованы" });
        }
        try{
            const data = jwt.verify(token, c.get("JWT").Secret);
            req.user_ID = data.ID;
            next();
        }catch (error){
            return res.send({message: "Неправильный токен!"} );
        }
        
    } catch (error) {
        console.log(error);
        return res.send({message: "Вы не авторизованы"});
    }
}