const config = require("config");
const { Sequelize } = require("sequelize");
const DB_Config = config.get('DB');

const sequelize = new Sequelize('backend_test', 'dude', 'pass', {
	host: DB_Config.host,
	dialect: 'mariadb'
});

try {
	sequelize.authenticate();
	console.log('OK');
} catch (error) {
	console.log("Error: ", error);
}

module.exports = Object.freeze({
	sequelize
});
