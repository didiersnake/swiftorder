const Sequelize = require("sequelize");
const config = require("config");

const { db_name, username, password, host, port } = config.get("postgres");

const sequelize = new Sequelize(db_name, username, password, {
  host: host,
  dialect: "postgres",
  port: port,
});

module.exports = sequelize;
