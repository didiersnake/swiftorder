const { DataTypes } = require("sequelize");

const Message = (sequelize) => {
  return sequelize.define("Message", {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    data: {
      type: DataTypes.JSONB,
      allowNull: false,
    },
  });
};

module.exports = Message;
