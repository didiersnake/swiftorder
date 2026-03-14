const { DataTypes } = require("sequelize");

const Order = (sequelize) => {
  return sequelize.define("Order", {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    totalAmount: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
  });
};

module.exports = Order;
