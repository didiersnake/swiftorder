const Sequelize = require("sequelize");
const config = require("config");

// const { db_name, username, password, host, port } = config.get("postgres");

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASS,
  {
    host: process.env.DB_HOST,
    dialect: "postgres",
    port: process.env.DB_PORT,
  },
);

module.exports = sequelize;
