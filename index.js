const express = require("express");
const config = require("config");
const Port = config.get("Server").Port;

const UserRouter = require("./routes/UserRouter");
const ProfileRouter = require("./routes/ProfileRouter");
const { User } = require("./models/UserModel");

const app = express();

app.use(express.json());
app.use("/user", UserRouter);
app.use("/profile", UserRouter);



app.listen(Port, ()=>{
    console.log(`[+] Server listenning on ${Port}`);

});