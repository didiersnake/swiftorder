const sequelize = require("../../config/postgres");
const { DataTypes } = require("sequelize");

const orderModel = require("./orderModel")(sequelize);
const productModel = require("./productModel")(sequelize);
const userModel = require("./userModel")(sequelize);
const messageModel = require("./messageModel")(sequelize);
const dayModel = require("./daysModel")(sequelize);

// Define associations
userModel.hasMany(orderModel, { foreignKey: "userId", as: "orders" });
orderModel.belongsTo(userModel, { foreignKey: "userId", as: "user" });

userModel.hasMany(messageModel, { foreignKey: "userId", as: "messages" });
messageModel.belongsTo(userModel, { foreignKey: "userId", as: "user" });

userModel.belongsTo(dayModel, { foreignKey: "deliveryDay", as: "day" });
dayModel.hasMany(userModel, { foreignKey: "deliveryDay", as: "users" });

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
  messageModel,
  dayModel,
  sequelize,
};
