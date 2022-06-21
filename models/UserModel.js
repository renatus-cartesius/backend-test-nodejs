const c = require("config");
const { DATE } = require("sequelize");
const {Sequelize, DataTypes} = require("sequelize");
const {sequelize} = require("../controllers/DbController");

const User = sequelize.define(
    'User',
    {
        ID: {type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true},
        Name: {type: DataTypes.STRING, allowNull: false},
	    Surname: {type: DataTypes.STRING, allowNull: false},
	    Phone: {type: DataTypes.STRING},
	    Email: {type: DataTypes.STRING},
        Pass: {type: DataTypes.STRING},
        Sex: {type: DataTypes.ENUM('Муж', 'Жен')},
        Photo: {type: DataTypes.STRING},
        Creation_time: {type: DataTypes.DATE, defaultValue: DataTypes.NOW}
    },
    {
        timestamps: false,
    }
)

console.log(User.sync({alter: true}));

module.exports = {
    User
}