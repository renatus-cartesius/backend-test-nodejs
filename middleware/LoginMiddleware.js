const jwt = require("jsonwebtoken");
const c = require("config");

module.exports = function (req, res, next){
    if(req.method == "OPTIONS"){
        next();
    }

    try {
        const token = req.headers.authorization;
        // if(!token){
        //     return res.send("Вы не авторизованы");
        // }
        const data = jwt.verify(token, c.get("JWT").Secret)
        req.user = data;
        next();
    } catch (error) {
        console.log(error);
        return res.send("Вы не авторизованы");
    }
}