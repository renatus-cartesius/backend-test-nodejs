const config = require("config");
const { Sequelize } = require("sequelize");
const DB = config.get('DB');

const sequelize = new Sequelize('backend_test', 'dude', 'pass', {
	host: DB.host,
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
