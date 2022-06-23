const express = require("express");
const c = require("config");
const Port = c.get("Server").Port;

const UserRouter = require("./routes/UserRouter");
const ProfileRouter = require("./routes/ProfileRouter");
const { User } = require("./models/UserModel");
const { sequelize } = require("./controllers/DbController");

const app = express();

app.get("/", (req, res)=>{res.sendFile(__dirname + "/static/html/index.html");});
app.get("/login", (req, res)=>{res.sendFile(__dirname + "/static/html/login.html");});
app.get("/register", (req, res)=>{res.sendFile(__dirname + "/static/html/register.html");});

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use("/user", UserRouter);
app.use("/profile", ProfileRouter);


app.listen(Port, ()=>{
    console.log(`[+] Server listenning on ${Port}`);
});