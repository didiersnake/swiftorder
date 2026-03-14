const sequelize = require("../../config/postgres");
const { DataTypes } = require("sequelize");

const orderModel = require("./orderModel")(sequelize);
const productModel = require("./productModel")(sequelize);
const userModel = require("./userModel")(sequelize);

// Define associations
userModel.hasMany(orderModel, { foreignKey: "userId", as: "orders" });
orderModel.belongsTo(userModel, { foreignKey: "userId", as: "user" });

const orderProduct = sequelize.define("OrderProduct", {
  quantity: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 1,
  },
  unitPrice: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
});

orderModel.belongsToMany(productModel, { through: orderProduct, as: "products" });
productModel.belongsToMany(orderModel, { through: orderProduct, as: "orders" });

module.exports = {
  userModel,
  productModel,
  orderModel,
  orderProduct,
  sequelize,
};
