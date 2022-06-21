var mariadb = require("mariadb");
const config = require("config");

const DB_Config = config.get('DB');
var pool = mariadb.createPool(DB_Config);

module.exports = Object.freeze({
	pool: pool
});
