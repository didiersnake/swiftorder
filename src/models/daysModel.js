const { DataTypes } = require("sequelize");

const Day = (sequelize) => {
  return sequelize.define("Day", {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    day: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });
};

module.exports = Day;
