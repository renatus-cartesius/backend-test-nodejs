const express = require("express");
const c = require("config");
const Port = c.get("Server").Port;
const valid = require("express-validator");

const UserRouter = require("./routes/UserRouter");
const ProfileRouter = require("./routes/ProfileRouter");
const { User } = require("./models/UserModel");
const { sequelize } = require("./controllers/DbController");
const ProfileController = require("./controllers/ProfileController");

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.get("/", (req, res)=>{res.sendFile(__dirname + "/static/html/index.html");});
app.get("/login", (req, res)=>{res.sendFile(__dirname + "/static/html/login.html");});
app.get("/register", (req, res)=>{res.sendFile(__dirname + "/static/html/register.html");});


app.use("/user", UserRouter);
app.use("/profile", ProfileRouter);
app.get("/profiles", 
    valid.query("page", "Номер страницы должен быть натуральным").isInt({ min: 1}),
    (req, res, next)=>{
        const errors = valid.validationResult(req);
        if(!errors.isEmpty()){
            return res.status(400).json({message: "Введены неккоретные данные:", error: valid.validationResult(req).errors});
        }
        else{
            next();
        }
    },
    ProfileController.get_all_users
);


app.listen(Port, ()=>{
    console.log(`[+] Server listenning on ${Port}`);
});