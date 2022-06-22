const express = require("express");
const config = require("config");
const Port = config.get("Server").Port;

const UserRouter = require("./routes/UserRouter");
const ProfileRouter = require("./routes/ProfileRouter");
const { User } = require("./models/UserModel");
const { sequelize } = require("./controllers/DbController");

const app = express();

app.get("/", (req, res)=>{res.sendFile(__dirname + "/static/html/index.html");})

app.use(express.json());
app.use("/user", UserRouter);
app.use("/profile", ProfileRouter);

console.log(JSON.stringify(sequelize.models.User));

app.listen(Port, ()=>{
    console.log(`[+] Server listenning on ${Port}`);
});