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
	    Email: {type: DataTypes.STRING, allowNull: false, unique: true},
        Pass: {type: DataTypes.STRING, allowNull: false},
        Sex: {type: DataTypes.ENUM('Мужской', 'Женский')},
        Photo: {type: DataTypes.STRING},
        Creation_time: {type: DataTypes.DATE, defaultValue: DataTypes.NOW}
    },
    {
        timestamps: false,
    }
)
;(async () => {
    // Обновление таблицы
    await sequelize.sync({alter: true});
  })();

module.exports = {
    User
}